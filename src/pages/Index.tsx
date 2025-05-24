import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [rotation, setRotation] = useState(0);

  const nftPrizes = [
    { name: "Золотой Дракон", rarity: "Legendary", color: "#FFD700" },
    { name: "Космический Кот", rarity: "Epic", color: "#9b87f5" },
    { name: "Магический Кристалл", rarity: "Rare", color: "#0EA5E9" },
    { name: "Светящийся Меч", rarity: "Uncommon", color: "#10B981" },
    { name: "Мистический Орб", rarity: "Common", color: "#8E9196" },
    { name: "Огненный Феникс", rarity: "Legendary", color: "#F97316" },
    { name: "Ледяной Щит", rarity: "Epic", color: "#06B6D4" },
    { name: "Звездная Пыль", rarity: "Rare", color: "#A855F7" },
  ];

  const packages = [
    { price: 50, spins: 1, bonus: "" },
    { price: 100, spins: 2, bonus: "+1 бонус" },
    { price: 150, spins: 3, bonus: "+2 бонуса" },
  ];

  const spinRoulette = (price: number) => {
    if (isSpinning) return;

    setSelectedPrice(price);
    setIsSpinning(true);

    const spins = 5 + Math.random() * 5;
    const finalRotation = rotation + spins * 360 + Math.random() * 360;
    setRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setShowPayment(true);
    }, 3000);
  };

  const handlePayment = () => {
    // Здесь будет интеграция с Telegram Payment
    alert(`Оплата ${selectedPrice} звезд через Telegram!`);
    setShowPayment(false);
    setSelectedPrice(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
          🎰 NFT Рулетка
        </h1>
        <p className="text-xl text-purple-200">
          Выиграй уникальные Telegram NFT!
        </p>
      </div>

      {/* Roulette Wheel */}
      <div className="flex justify-center mb-12">
        <div className="relative w-96 h-96">
          {/* Wheel Background */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 shadow-2xl">
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
                      className="absolute w-0 h-0 border-l-[192px] border-r-[192px] border-b-[100px] border-transparent"
                      style={{
                        borderBottomColor: prize.color,
                        filter: "brightness(0.9)",
                      }}
                    />
                    <div className="absolute bottom-8 text-xs font-bold text-white z-10 transform -rotate-90">
                      {prize.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Center Circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold text-purple-900 shadow-lg z-20">
            🎯
          </div>

          {/* Pointer */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-yellow-400 z-30" />
        </div>
      </div>

      {/* Purchase Options */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Выбери свой пакет
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className="bg-white/10 backdrop-blur-sm border-purple-400/30 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-yellow-400">
                  ⭐ {pkg.price} звезд
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
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-3 text-lg"
                >
                  {isSpinning && selectedPrice === pkg.price ? (
                    <span className="flex items-center">🎰 Крутим...</span>
                  ) : (
                    "Крутить рулетку!"
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <Card className="bg-gradient-to-br from-purple-800 to-blue-800 border-yellow-400 max-w-md mx-4">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-yellow-400">
                🎉 Поздравляем!
              </CardTitle>
              <p className="text-purple-200">Вы выиграли NFT подарок!</p>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-lg text-white">
                Стоимость:{" "}
                <span className="text-yellow-400 font-bold">
                  ⭐ {selectedPrice} звезд
                </span>
              </div>
              <div className="space-y-3">
                <Button
                  onClick={handlePayment}
                  className="w-full bg-green-500 hover:bg-green-400 text-white font-bold py-3"
                >
                  💳 Оплатить через Telegram
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
        <p>🔥 Уникальные NFT подарки каждый день!</p>
        <p className="text-sm mt-2">Powered by Telegram Stars ⭐</p>
      </div>
    </div>
  );
};

export default Index;
