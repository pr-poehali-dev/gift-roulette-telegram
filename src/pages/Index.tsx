import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTelegramWebApp } from "@/components/TelegramWebApp";

const Index = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [rotation, setRotation] = useState(0);
  const { user, showMainButton, hideMainButton, hapticFeedback, isInTelegram } =
    useTelegramWebApp();

  const nftPrizes = [
    { name: "Золотой Bitcoin", rarity: "Legendary", color: "#FFD700" },
    { name: "Ethereum Crystal", rarity: "Epic", color: "#627EEA" },
    { name: "Dogecoin Meme", rarity: "Rare", color: "#C2A633" },
    { name: "Solana Blade", rarity: "Uncommon", color: "#9945FF" },
    { name: "Cardano Shield", rarity: "Common", color: "#0033AD" },
    { name: "Polygon Phoenix", rarity: "Legendary", color: "#8247E5" },
    { name: "Chainlink Oracle", rarity: "Epic", color: "#375BD2" },
    { name: "Binance Crown", rarity: "Rare", color: "#F3BA2F" },
  ];

  const packages = [
    { price: 100, spins: 1, bonus: "", stars: "⭐" },
    { price: 200, spins: 2, bonus: "+1 бонус", stars: "⭐⭐" },
    { price: 500, spins: 5, bonus: "+3 бонуса", stars: "⭐⭐⭐" },
  ];

  useEffect(() => {
    if (isInTelegram && user) {
      hideMainButton();
    }
  }, [isInTelegram, user]);

  const spinRoulette = (price: number) => {
    if (isSpinning) return;

    hapticFeedback("heavy");
    setSelectedPrice(price);
    setIsSpinning(true);

    const spins = 5 + Math.random() * 5;
    const finalRotation = rotation + spins * 360 + Math.random() * 360;
    setRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setShowPayment(true);
      hapticFeedback("light");
    }, 3000);
  };

  const handlePayment = () => {
    hapticFeedback("heavy");
    if (isInTelegram) {
      // Telegram Stars payment integration
      alert(`💫 Оплата ${selectedPrice} Telegram Stars!`);
    } else {
      alert(`💫 Оплата ${selectedPrice} звезд через Telegram!`);
    }
    setShowPayment(false);
    setSelectedPrice(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute top-20 left-10 text-6xl animate-bounce">₿</div>
        <div className="absolute top-40 right-20 text-4xl animate-pulse">Ξ</div>
        <div className="absolute bottom-40 left-20 text-5xl animate-spin">
          ◊
        </div>
        <div className="absolute bottom-20 right-10 text-3xl animate-bounce">
          ⟐
        </div>
      </div>

      {/* Header */}
      <div className="relative text-center py-8 px-4">
        <div className="flex items-center justify-center mb-4">
          <img
            src="/oskar-logo.svg"
            alt="Crypto Oskar"
            className="w-16 h-16 mr-4"
          />
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              CRYPTO OSKAR
            </h1>
            <p className="text-lg text-gray-300 mt-1">SHOP</p>
          </div>
        </div>
        {user && (
          <p className="text-purple-300 text-lg">
            👋 Привет, {user.first_name}!
          </p>
        )}
        <p className="text-xl text-purple-200">
          🎲 Крути рулетку за Telegram Stars!
        </p>
      </div>

      {/* Roulette Wheel */}
      <div className="flex justify-center mb-12 px-4">
        <div className="relative w-80 h-80 md:w-96 md:h-96">
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 opacity-20 animate-pulse blur-xl"></div>

          {/* Wheel Background */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 shadow-2xl border-4 border-yellow-500">
            {/* Wheel Sectors */}
            <div
              className="w-full h-full rounded-full relative overflow-hidden transition-transform duration-3000 ease-out"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {nftPrizes.map((prize, index) => {
                const angle = (360 / nftPrizes.length) * index;
                return (
                  <div
                    key={index}
                    className="absolute w-full h-full flex items-center justify-center text-center"
                    style={{
                      transform: `rotate(${angle}deg)`,
                      transformOrigin: "50% 50%",
                    }}
                  >
                    <div
                      className="absolute w-0 h-0 border-l-[160px] border-r-[160px] border-b-[80px] border-transparent md:border-l-[192px] md:border-r-[192px] md:border-b-[100px]"
                      style={{
                        borderBottomColor: prize.color,
                        filter: "brightness(0.9)",
                      }}
                    />
                    <div className="absolute bottom-6 md:bottom-8 text-xs font-bold text-white z-10 transform -rotate-90 px-1">
                      {prize.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Center Bitcoin */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl font-bold text-black shadow-lg z-20">
            ₿
          </div>

          {/* Pointer */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-yellow-400 z-30 drop-shadow-lg" />
        </div>
      </div>

      {/* Purchase Options */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          💎 Выбери свой пакет
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm border-yellow-500/30 hover:bg-gray-700/50 transition-all duration-300 hover:scale-105 hover:border-yellow-400/50"
            >
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-yellow-400">
                  {pkg.stars} {pkg.price} Stars
                </CardTitle>
                <p className="text-purple-200">
                  {pkg.spins} вращение{pkg.spins > 1 ? "я" : ""}
                </p>
                {pkg.bonus && (
                  <p className="text-green-400 font-semibold">{pkg.bonus}</p>
                )}
              </CardHeader>
              <CardContent className="text-center">
                <Button
                  onClick={() => spinRoulette(pkg.price)}
                  disabled={isSpinning}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-3 text-lg shadow-lg"
                >
                  {isSpinning && selectedPrice === pkg.price ? (
                    <span className="flex items-center">🎰 Крутим...</span>
                  ) : (
                    "🚀 КРУТИТЬ!"
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-yellow-400 max-w-md w-full">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-yellow-400">
                🎉 JACKPOT!
              </CardTitle>
              <p className="text-purple-200">Ты выиграл крипто NFT!</p>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-lg text-white">
                Стоимость:{" "}
                <span className="text-yellow-400 font-bold">
                  ⭐ {selectedPrice} Telegram Stars
                </span>
              </div>
              <div className="space-y-3">
                <Button
                  onClick={handlePayment}
                  className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3"
                >
                  💳 Оплатить Stars
                </Button>
                <Button
                  onClick={() => setShowPayment(false)}
                  variant="outline"
                  className="w-full border-purple-400 text-purple-200 hover:bg-purple-800"
                >
                  ❌ Отмена
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Footer */}
      <div className="text-center py-8 text-purple-300">
        <p className="flex items-center justify-center">
          <img src="/oskar-logo.svg" alt="Oskar" className="w-6 h-6 mr-2" />
          🔥 Crypto Oskar Shop - Твой крипто магазин!
        </p>
        <p className="text-sm mt-2">Powered by Telegram Stars ⭐</p>
      </div>
    </div>
  );
};

export default Index;
