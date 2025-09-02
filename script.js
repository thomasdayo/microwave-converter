document.addEventListener('DOMContentLoaded', () => {
    // HTML要素への参照を取得
    const standardWattageInput = document.getElementById('standardWattage');
    const standardTimeMinutesInput = document.getElementById('standardTimeMinutes');
    const standardTimeSecondsInput = document.getElementById('standardTimeSeconds');
    const targetWattageInput = document.getElementById('targetWattage');
    const calculateButton = document.getElementById('calculateButton');
    const resultMinutesSpan = document.getElementById('resultMinutes');
    const resultSecondsSpan = document.getElementById('resultSeconds');

    // 計算ボタンがクリックされたときの処理
    calculateButton.addEventListener('click', () => {
        // 入力値を取得し、数値に変換
        const standardWattage = parseFloat(standardWattageInput.value);
        const standardTimeMinutes = parseFloat(standardTimeMinutesInput.value);
        const standardTimeSeconds = parseFloat(standardTimeSecondsInput.value);
        const targetWattage = parseFloat(targetWattageInput.value);

        // 入力値のバリデーション
        if (isNaN(standardWattage) || isNaN(standardTimeMinutes) || isNaN(standardTimeSeconds) || isNaN(targetWattage) ||
            standardWattage <= 0 || targetWattage <= 0 || standardTimeMinutes < 0 || standardTimeSeconds < 0) {
            alert('有効な数値を入力してください。ワット数は1以上、時間は0以上である必要があります。');
            return; // 処理を中断
        }

        // 標準加熱時間を秒に変換
        const totalStandardSeconds = (standardTimeMinutes * 60) + standardTimeSeconds;

        // 新しい加熱時間を計算
        // エネルギー量 = ワット数 × 時間
        // 標準エネルギー量 = 標準ワット数 × 標準時間
        // 新しい時間 = 標準エネルギー量 / 指定ワット数
        const newTotalSeconds = (standardWattage * totalStandardSeconds) / targetWattage;

        // 新しい加熱時間を分と秒に変換
        const newMinutes = Math.floor(newTotalSeconds / 60);
        const newSeconds = Math.round(newTotalSeconds % 60); // 秒は四捨五入

        // 結果を表示
        resultMinutesSpan.textContent = newMinutes;
        resultSecondsSpan.textContent = newSeconds;
    });
});