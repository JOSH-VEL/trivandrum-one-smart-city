import { blink } from './firebase';

const DAILY_COIN_LIMIT = 200;

export async function claimReward(
  userId: string,
  campaignId: string,
  type: 'QR' | 'INSTAGRAM' | 'ADMIN',
  minCoins: number,
  maxCoins: number
): Promise<{ success: boolean; coins: number; message: string }> {
  try {
    // Get user data
    const users = await blink.db.users.list({
      where: { id: userId },
      limit: 1
    });

    if (!users || users.length === 0) {
      return { success: false, coins: 0, message: 'User not found' };
    }

    const user = users[0] as any;

    // Check daily limit
    const today = new Date().toISOString().split('T')[0];
    const transactions = await blink.db.rewardTransactions.list({
      where: { userId, type }
    });

    const todayTransactions = transactions.filter((t: any) => 
      t.createdAt?.startsWith(today)
    );

    const dailyCoins = todayTransactions.reduce((sum: number, t: any) => sum + (t.coins || 0), 0);

    if (dailyCoins >= DAILY_COIN_LIMIT) {
      return { 
        success: false, 
        coins: 0, 
        message: 'Daily coin limit reached. Come back tomorrow!' 
      };
    }

    // Check if already claimed for this campaign today
    const alreadyClaimed = todayTransactions.some((t: any) => t.campaignId === campaignId);

    if (alreadyClaimed) {
      return { 
        success: false, 
        coins: 0, 
        message: 'You have already claimed this reward today' 
      };
    }

    // Calculate random coins
    const coins = Math.floor(Math.random() * (maxCoins - minCoins + 1)) + minCoins;
    const availableCoins = Math.min(coins, DAILY_COIN_LIMIT - dailyCoins);

    if (availableCoins <= 0) {
      return { 
        success: false, 
        coins: 0, 
        message: 'Daily coin limit reached' 
      };
    }

    // Create reward transaction
    await blink.db.rewardTransactions.create({
      id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      campaignId,
      type,
      coins: availableCoins,
      createdAt: new Date().toISOString()
    });

    // Update user coins
    const newTotalCoins = (user.totalCoins || 0) + availableCoins;
    await blink.db.users.update(userId, {
      totalCoins: newTotalCoins,
      dailyCoins: dailyCoins + availableCoins
    });

    // Record QR event
    if (type === 'QR') {
      await blink.db.qrEvents.create({
        id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        campaignId,
        userId,
        scannedAt: new Date().toISOString(),
        ip: '',
        deviceId: ''
      });
    }

    return { 
      success: true, 
      coins: availableCoins, 
      message: `You earned ${availableCoins} coins!` 
    };
  } catch (error) {
    console.error('Claim reward error:', error);
    return { 
      success: false, 
      coins: 0, 
      message: 'Failed to claim reward. Please try again.' 
    };
  }
}

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
