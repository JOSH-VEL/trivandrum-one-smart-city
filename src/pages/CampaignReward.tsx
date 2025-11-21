import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Gift, Instagram, Loader2, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { Campaign, Brand } from '../types';
import { blink } from '../lib/firebase';
import { claimReward } from '../lib/rewards';
import { RewardAnimation } from '../components/RewardAnimation';
import { toast } from 'sonner';

export function CampaignReward() {
  const { campaignId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [rewardCoins, setRewardCoins] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    loadCampaign();
  }, [campaignId]);

  async function loadCampaign() {
    if (!campaignId) return;

    setLoading(true);
    try {
      const campaigns = await blink.db.campaigns.list({
        where: { id: campaignId },
        limit: 1
      });
      
      if (campaigns && campaigns.length > 0) {
        const campaignData = campaigns[0] as Campaign;
        setCampaign(campaignData);

        // Load brand details
        if (campaignData.brandId) {
          const brands = await blink.db.brands.list({
            where: { id: campaignData.brandId },
            limit: 1
          });
          
          if (brands && brands.length > 0) {
            setBrand(brands[0] as Brand);
          }
        }
      }
    } catch (error) {
      console.error('Error loading campaign:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleClaimReward() {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!campaignId) return;

    setClaiming(true);
    try {
      const result = await claimReward(user.id, campaignId, 'QR', 20, 40);
      
      if (result.success) {
        setRewardCoins(result.coins);
        setShowAnimation(true);
        setClaimed(true);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Failed to claim reward');
    } finally {
      setClaiming(false);
    }
  }

  async function handleInstagramShare() {
    if (!user || !campaignId) return;

    const result = await claimReward(user.id, campaignId, 'INSTAGRAM', 20, 30);
    
    if (result.success) {
      setRewardCoins(result.coins);
      setShowAnimation(true);
      toast.success('Instagram bonus claimed!');
    } else {
      toast.error(result.message);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-24 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!campaign || !campaign.active) {
    return (
      <div className="min-h-screen pt-20 pb-24 flex items-center justify-center">
        <Card className="max-w-md mx-4 text-center p-8">
          <Gift className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Campaign Not Found</h2>
          <p className="text-muted-foreground mb-6">
            This campaign is not available or has expired.
          </p>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-24 lg:pb-8">
      <RewardAnimation
        coins={rewardCoins}
        show={showAnimation}
        onComplete={() => setShowAnimation(false)}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Campaign Card */}
          <Card className="mb-6 overflow-hidden">
            {brand?.images && brand.images.length > 0 && (
              <div className="h-48 bg-gradient-primary relative">
                <img
                  src={brand.images[0]}
                  alt={brand.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            )}
            
            <CardHeader>
              <CardTitle className="text-2xl">{campaign.title}</CardTitle>
              {brand && (
                <p className="text-sm text-muted-foreground">
                  by {brand.name}
                </p>
              )}
            </CardHeader>
            
            <CardContent>
              <p className="text-muted-foreground mb-6">{campaign.description}</p>

              {!user ? (
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-center">
                      Sign in to claim your reward and start earning coins!
                    </p>
                  </div>
                  <Button onClick={() => navigate('/login')} className="w-full" size="lg">
                    Sign In to Claim
                  </Button>
                </div>
              ) : claimed ? (
                <div className="space-y-4">
                  <div className="p-6 bg-secondary/10 rounded-lg text-center">
                    <CheckCircle className="w-12 h-12 mx-auto mb-3 text-secondary" />
                    <h3 className="text-xl font-bold mb-2">Reward Claimed!</h3>
                    <p className="text-muted-foreground">
                      You earned {rewardCoins} coins
                    </p>
                  </div>

                  {campaign.extraRewardEnabled && (
                    <Card className="border-accent">
                      <CardContent className="p-6">
                        <div className="text-center mb-4">
                          <Instagram className="w-12 h-12 mx-auto mb-3 text-accent" />
                          <h4 className="font-bold text-lg mb-2">Earn Extra Coins!</h4>
                          <p className="text-sm text-muted-foreground">
                            Share this campaign on Instagram to earn 20-30 bonus coins
                          </p>
                        </div>
                        <Button
                          onClick={handleInstagramShare}
                          className="w-full"
                          variant="outline"
                        >
                          <Instagram className="w-4 h-4 mr-2" />
                          Share on Instagram
                        </Button>
                      </CardContent>
                    </Card>
                  )}

                  <Button onClick={() => navigate('/rewards')} className="w-full" variant="outline">
                    View My Rewards
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-6 gradient-primary rounded-lg text-center text-white">
                    <Gift className="w-16 h-16 mx-auto mb-3" />
                    <h3 className="text-2xl font-bold mb-2">Claim Your Reward</h3>
                    <p className="text-lg opacity-90">
                      Earn 20-40 coins instantly!
                    </p>
                  </div>

                  <Button
                    onClick={handleClaimReward}
                    disabled={claiming}
                    className="w-full"
                    size="lg"
                  >
                    {claiming ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Claiming...
                      </>
                    ) : (
                      'Claim Reward'
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Daily limit: 200 coins per day
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Brand Info */}
          {brand && (
            <Card>
              <CardHeader>
                <CardTitle>About {brand.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{brand.description}</p>
                
                {brand.address && (
                  <p className="text-sm mb-2">
                    <strong>Address:</strong> {brand.address}
                  </p>
                )}
                
                {brand.phone && (
                  <p className="text-sm mb-2">
                    <strong>Phone:</strong> {brand.phone}
                  </p>
                )}

                {brand.socials && (
                  <div className="flex gap-3 mt-4">
                    {brand.socials.instagram && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(brand.socials?.instagram, '_blank')}
                      >
                        <Instagram className="w-4 h-4 mr-2" />
                        Instagram
                      </Button>
                    )}
                    {brand.socials.website && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(brand.socials?.website, '_blank')}
                      >
                        Visit Website
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
