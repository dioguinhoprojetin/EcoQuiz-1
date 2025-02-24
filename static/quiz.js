const questions = [
    {
      question: "How often do you recycle plastic bottles?",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weights: [100, 75, 50, 25, 0], // Peso de CO₂ para cada respuesta
    },
    {
      question: "How often do you separate organic waste?",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weights: [100, 75, 50, 25, 0],
    },
    {
      question: "How much waste do you produce weekly?",
      answers: ["Very little", "A little", "Moderate", "A lot", "Too much"],
      weights: [0, 25, 50, 75, 100],
    },
    {
      question: "Do you compost food scraps?",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weights: [100, 75, 50, 25, 0],
    },
    {
      question: "Do you use reusable bags when shopping?",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weights: [100, 75, 50, 25, 0],
    },
    {
      question: "How often do you use public transportation?",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weights: [100, 75, 50, 25, 0],
    },
    {
      question: "Do you turn off lights when leaving a room?",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weights: [100, 75, 50, 25, 0],
    },
    {
      question: "How often do you buy second-hand items?",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weights: [100, 75, 50, 25, 0],
    },
    {
      question: "Do you reduce water usage at home?",
      answers: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      weights: [100, 75, 50, 25, 0],
    },
    {
      question: "How often do you eat meat?",
      answers: ["Daily", "Several times a week", "Once a week", "Rarely", "Never"],
      weights: [100, 75, 50, 25, 0],
    },
  ];
  
  // Variables globales
  let currentQuestion = 0;
  let userAnswers = [];
  let totalCO2 = 0;
  const maxCO2 = 1000; // Máxima huella de CO₂ posible
  
  // Cargar la pregunta actual
  function loadQuestion() {
    const questionText = document.getElementById("question-text");
    const answersContainer = document.getElementById("answers-container");
    const nextButton = document.getElementById("next-button");
  
    questionText.textContent = questions[currentQuestion].question;
    answersContainer.innerHTML = "";
  
    questions[currentQuestion].answers.forEach((answer, index) => {
      const button = document.createElement("div");
      button.textContent = answer;
      button.classList.add("scale-button");
  
      if (index < 2) {
        button.style.borderColor = "#4CAF50"; // Verde
      } else if (index === 2) {
        button.style.borderColor = "#999"; // Gris
      } else {
        button.style.borderColor = "#9C27B0"; // Morado
      }
  
      button.onclick = () => {
        selectAnswer(index, button);
        nextButton.style.display = "block";
      };
      answersContainer.appendChild(button);
    });
  }
  
  // Seleccionar una respuesta
  function selectAnswer(index, button) {
    const buttons = document.querySelectorAll(".scale-button");
    buttons.forEach((btn) => btn.classList.remove("selected"));
    button.classList.add("selected");
    userAnswers[currentQuestion] = index;
    updateCO2Indicator();
  }
  
  // Actualizar el indicador de CO₂
  function updateCO2Indicator() {
    const co2Progress = document.getElementById("co2-progress");
    const co2Footprint = calculateCO2Footprint(userAnswers);
    const percentage = (co2Footprint / maxCO2) * 100;
    co2Progress.style.width = `${percentage}%`;
    darkenBackground(co2Footprint);
  }
  
  // Calcular la huella de CO₂
  function calculateCO2Footprint(answers) {
    let totalCO2 = 0;
    answers.forEach((answer, index) => {
      totalCO2 += questions[index].weights[answer];
    });
    return totalCO2;
  }
  
  // Oscurecer el fondo según la huella de CO₂
  function darkenBackground(co2Footprint) {
    const body = document.body;
    const opacity = Math.min((co2Footprint / maxCO2) * 0.8, 0.8); // Limita la opacidad a 0.8
    body.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
  }
  
  // Mostrar los resultados
  function showResults() {
    document.getElementById("quiz-container").classList.add("hidden");
    document.getElementById("output-container").classList.remove("hidden");
  
    const co2Footprint = calculateCO2Footprint(userAnswers);
    document.getElementById("output-text").textContent = `Your estimated CO2 emissions are ${co2Footprint.toFixed(2)} kg per year.`;
  
    darkenBackground(co2Footprint);
    showEmissionsChart();
    showImpactMap();
    showPersonalizedTips();
  }
  
  // Mostrar el gráfico de emisiones
  function showEmissionsChart() {
    const ctx = document.getElementById("emissionsChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Before Recycling", "After Recycling"],
        datasets: [
          {
            label: "CO2 Emissions (kg)",
            data: [1200, calculateCO2Footprint(userAnswers)], // Datos de ejemplo
            backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(75, 192, 192, 0.2)"],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
    document.getElementById("chart-container").classList.remove("hidden");
  }
  
  // Mostrar el mapa de impacto
  function showImpactMap() {
    const mapContainer = document.getElementById("map");
    mapContainer.innerHTML = `<img src="/static/images/world-map.png" alt="World Map" style="width: 100%; height: auto;">`;
    document.getElementById("map-container").classList.remove("hidden");
  }
  
  // Mostrar consejos personalizados
  function showPersonalizedTips() {
    const tipsList = document.getElementById("tips-list");
    tipsList.innerHTML = `
      <li>Start recycling plastic bottles and paper.</li>
      <li>Use reusable bags when shopping.</li>
      <li>Compost your food scraps to reduce organic waste.</li>
      <li>Donate old clothes instead of throwing them away.</li>
    `;
    document.getElementById("tips-container").classList.remove("hidden");
  }
  
  // Event listeners
  document.addEventListener("DOMContentLoaded", () => {
    loadQuestion();
  
    document.getElementById("next-button").addEventListener("click", () => {
      currentQuestion++;
      if (currentQuestion < questions.length) {
        loadQuestion();
      } else {
        showResults();
      }
    });
  
    document.getElementById("restart-button").addEventListener("click", () => {
      currentQuestion = 0;
      userAnswers = [];
      totalCO2 = 0;
      document.getElementById("output-container").classList.add("hidden");
      document.getElementById("quiz-container").classList.remove("hidden");
      loadQuestion();
      updateCO2Indicator();
    });
  });git