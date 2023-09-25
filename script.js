function openModal(planNumber) {
    const modal = document.getElementById("pricingModal");
    modal.style.display = "block";

    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
      card.classList.remove('highlighted');
      if (index === planNumber - 1) {
        card.classList.add('highlighted');
      }
    });
  }
  
  function closeModal() {
    const modal = document.getElementById("pricingModal");
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    const modal = document.getElementById("pricingModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  }

  function highlightPlan(planNumber) {
    const cards = document.querySelectorAll('.col');
    const buttons = document.querySelectorAll('.col .btn-primary');

    cards.forEach(card => card.classList.remove('highlighted'));
    buttons.forEach(button => button.classList.remove('btn-highlight'));

    const highlightedCard = document.querySelector(`.col:nth-child(${planNumber})`);
    const highlightedButton = document.querySelector(`.col:nth-child(${planNumber}) .btn-primary`);
  
    if (highlightedCard) {
      highlightedCard.classList.add('highlighted');
    }
  
    if (highlightedButton) {
      highlightedButton.classList.add('btn-highlight');
    }
  }
  
  const userRange = document.getElementById('userRange');
  const sliderLabels = document.querySelectorAll('.slider-labels span');
  
  userRange.addEventListener('input', () => {
    const value = parseInt(userRange.value, 10);
    sliderLabels.forEach(label => label.classList.remove('highlight'));

    if (value >= 0 && value < 10) {
      sliderLabels[0].classList.add('highlight');
      highlightPlan(1);
    } else if (value >= 10 && value < 20) {
      sliderLabels[1].classList.add('highlight');
      highlightPlan(2);
    } else if (value >= 20 && value < 30) {
      sliderLabels[2].classList.add('highlight');
      highlightPlan(3);
    } else {
      sliderLabels[3].classList.add('highlight');
      highlightPlan(4);
    }
  });


  function populateFormAndSubmit() {
    const firstname = document.getElementById('firstname').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const data = {
      firstname: firstname,
      email: email,
      message: message
    };

    const endpoint = 'http://localhost:3000/submitForm';
    const accessCode = '7A75T83FNDCFTF9MKSBWIU1FX';
  
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Code': accessCode
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Form submitted successfully:', data);
      displayAcknowledgement('Form submitted successfully!');
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


function displayAcknowledgement(message) {
  const acknowledgementContainer = document.getElementById('acknowledgement');
  if (acknowledgementContainer) {
    acknowledgementContainer.innerText = message;
    acknowledgementContainer.style.display = 'block';
  } else {
    console.error('Acknowledgement container not found.');
  }
}

let apiDataLoaded = false;

function loadApiData() {
  const loadingSpinner = document.getElementById('loadingSpinner');
  loadingSpinner.style.display = 'block';

  if (!apiDataLoaded) {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => {
        displayData(data);
        apiDataLoaded = true;
        loadingSpinner.style.display = 'none'; 
      })
      .catch(error => {
        console.error('Error:', error);
        loadingSpinner.style.display = 'none'; 
      });
  }
  
}

function displayApiData() {
  if (!apiDataLoaded) {
    const loadingSpinner = document.getElementById('loadingSpinner');
    loadingSpinner.style.display = 'flex';  

    setTimeout(() => {  
      fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => {
          displayData(data);
          apiDataLoaded = true;
          loadingSpinner.style.display = 'none';  
        })
        .catch(error => {
          console.error('Error:', error);
          loadingSpinner.style.display = 'none';  
        });
    }, 2000);  
  }
}


const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      displayApiData();
      observer.disconnect(); 
    }
  });
}, { threshold: 0.5 }); 

const displayDataButton = document.getElementById('displayDataButton');
displayDataButton.addEventListener('click', loadApiData);
observer.observe(displayDataButton);

  function displayData(data) {
    const dataDisplay = document.getElementById('dataDisplay');
    dataDisplay.innerHTML = ''; 
  
    const gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');
  
    data.forEach(item => {
      const itemDisplay = document.createElement('div');
      itemDisplay.classList.add('api-data-box');
      itemDisplay.innerHTML = `
        <p class="nice-format-data"><strong>User ID:</strong> <span class="nice-format-text">${item.userId}</span></p>
        <p class="nice-format-data"><strong>ID:</strong> <span class="nice-format-text">${item.id}</span></p>
        <p class="nice-format-data"><strong>Title:</strong> <span class="nice-format-text">${item.title}</span></p>
        <p class="nice-format-data"><strong>Completed:</strong> <span class="nice-format-text">${item.completed}</span></p>
      `;
      gridContainer.appendChild(itemDisplay);
    });
  
    dataDisplay.appendChild(gridContainer);
  }
  
