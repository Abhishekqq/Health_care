 const heartRateDisplay = document.getElementById('heartRate');
  const startBtn = document.getElementById('startBtn');
  const stopBtn = document.getElementById('stopBtn');
  const resetBtn = document.getElementById('resetBtn');
  const heartIcon = document.querySelector('.heart-icon');
  const canvas = document.getElementById('chart');
  const ctx = canvas.getContext('2d');

  let intervalId = null;
  let currentBpm = 75;  
  let targetBpm = 75;
  const bpmMin = 60;
  const bpmMax = 100;
  const dataPoints = [];
  const maxDataPoints = 60;  

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

   
  function drawChart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    ctx.fillStyle = '#fff0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    
    ctx.strokeStyle = '#f3c0c0';
    ctx.lineWidth = 1;
    ctx.font = "12px Roboto";

    for (let i = 0; i <= 4; i++) {
      const y = (canvas.height / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();

       
      const bpmLabel = bpmMax - ((bpmMax - bpmMin) / 4) * i;
      ctx.fillStyle = '#a33';
      ctx.fillText(`${Math.round(bpmLabel)} bpm`, 5, y - 3);
    }

    
    if (dataPoints.length > 1) {
      ctx.strokeStyle = '#d32f2f';
      ctx.lineWidth = 3;
      ctx.beginPath();
      const stepX = canvas.width / (maxDataPoints - 1);
      dataPoints.forEach((bpm, idx) => {
        const x = stepX * idx;
         
        const y = canvas.height - ((bpm - bpmMin) / (bpmMax - bpmMin)) * canvas.height;
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    }
  }

  
  function updateHeartRate() {
     
    if (Math.random() < 0.3) {
      targetBpm = Math.floor(Math.random() * (bpmMax - bpmMin + 1)) + bpmMin;
    }

     
    currentBpm = lerp(currentBpm, targetBpm, 0.1);
    currentBpm = Math.round(currentBpm);

     
    heartRateDisplay.textContent = `${currentBpm} bpm`;

    
    const pulseDuration = 60 / currentBpm;  
    heartIcon.style.animationDuration = `${pulseDuration}s`;

     
    if (dataPoints.length >= maxDataPoints) {
      dataPoints.shift();
    }
    dataPoints.push(currentBpm);

    drawChart();
  }

  startBtn.addEventListener('click', () => {
    if (!intervalId) {
      updateHeartRate();  
      intervalId = setInterval(updateHeartRate, 1000);
      startBtn.disabled = true;
      stopBtn.disabled = false;
      resetBtn.disabled = false;
    }
  });

  stopBtn.addEventListener('click', () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
      startBtn.disabled = false;
      stopBtn.disabled = true;
    }
  });

  resetBtn.addEventListener('click', () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    currentBpm = 75;
    targetBpm = 75;
    heartRateDisplay.textContent = '-- bpm';
    heartIcon.style.animationDuration = '1s';
    dataPoints.length = 0;
    drawChart();
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = true;
  });

   
  drawChart();
