
let main = document.getElementById('main');

let allcCategories =[];
let endPoint;
let result;
let index;

let  nameInput = document.querySelector('.nameInput');
let  emailInput = document.querySelector('.emailInput');
let  phoneInput = document.querySelector('.phoneInputnameInput');
let  ageInput = document.querySelector('.ageInput');
let  passwordInput = document.querySelector('.passwordInput');
let  rePasswordInput = document.querySelector('.rePasswordInput');

let nameAlert = document.getElementById('nameAlert');
let emailAlert = document.getElementById('emailAlert');
let phoneAlert = document.getElementById('phoneAlert');
let ageAlert = document.getElementById('ageAlert');
let passwordAlert = document.getElementById('passwordAlert');
let repasswordAlert = document.getElementById('repasswordAlert');

let nameRegex= /^[a-zA-Z ]+$/;
let  emailRegex =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let  phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
let  ageRegex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
let  passwordRegex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
//let  rePasswordRegex == passwordRegex;

let isOpen = false;

$('.close').click(function(){
  if(isOpen) {
    $('aside').animate({marginLeft: 0}, 700);
    $('.close ').html('<i class=" fa-solid open-close-icon fa-2x fa-align-justify "></i>');
    isOpen = false;
  } else {
    $('aside').animate({marginLeft: 275}, 700);
    $('.close ').html('<i class=" fa-solid open-close-icon fa-2x fa-x"></i>');
    isOpen = true;
  }
});


async function categories(fun){
  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/${endPoint}`);
  result = await res.json();
  fun(result.meals);
};

async function runing(){
  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
  result = await res.json();
  run()
};
runing()


function run(){
  allcCategories = result.meals
  let categoriesHTML= '';
for(let i = 0; i < allcCategories.length; i++) {
      categoriesHTML += 
      `
      <div class="col-md-3 card-catgegory">
        <figure class="item position-relative">
          <img class="w-100" src="${allcCategories[i].strMealThumb}" alt="${allcCategories[i].strMeal}">
          <figcaption class="position-absolute top-0 start-0 bottom-0 end-0 p-3 text-center rounded-3 d-flex align-items-center ">
            <h2>${allcCategories[i].strMeal}</h2>
          </figcaption>
        </figure>
      </div>
      `
    };
main.innerHTML = categoriesHTML;
};

function displayAllCategories(){
  allcCategories = result.categories
  let categoriesHTML= '';
  for(let i = 0 ; i<allcCategories.length; i++ ){
    categoriesHTML += 
    `
    <div class="col-md-3 card-catgegory" data-category="${allcCategories[i].strCategory}">
      <figure class="item position-relative">
        <img class="w-100" src="${allcCategories[i].strCategoryThumb}" alt="${allcCategories[i].strCategory}">
        <figcaption class="position-absolute top-0 start-0 bottom-0 end-0 p-3 text-center rounded-3">
          <h2>${allcCategories[i].strCategory}</h2>
          <p>
          ${allcCategories[i].strCategoryDescription}
          </p>
        </figcaption>
      </figure>
    </div>
    `
  }
  main.innerHTML = categoriesHTML;

  const cards = document.querySelectorAll(".card-catgegory");
  for(let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function(){
      getEndPointFilterCategory(cards[i].dataset.category)
    });
  };
};

function displaySubCategory() {
  allcCategories = result.meals;
  let categoriesHTML= '';
  for(let i = 0 ; i<allcCategories.length; i++ ){
    categoriesHTML += 
    `
    <div class="col-md-3 card-catgegory" data-meals="${allcCategories[i].idMeal}">
			<figure class="item position-relative">
				<img class="w-100" src="${allcCategories[i].strMealThumb}" alt="${allcCategories[i].strMeal}">
        <figcaption class="position-absolute top-0 start-0 bottom-0 end-0 p-3 text-center rounded-3 d-flex align-items-center ">
          <h2>${allcCategories[i].strMeal}</h2>
        </figcaption>
			</figure>
    </div>
    `
  };
  main.innerHTML = categoriesHTML;

  const meals = document.querySelectorAll(".card-catgegory");
  for(let i = 0; i < meals.length; i++) {
    meals[i].addEventListener("click", function(){
      getEndPointFilterMeals(meals[i].dataset.meals)
    });
  };
};
function displayAllMeals(arr){
  
    let categoriesHTML= '';
    document.querySelector(".meal-container").innerHTML = categoriesHTML;
  for(let i = 0; i < arr.length; i++) {
    categoriesHTML += 
    `
    <div class="col-md-3 card-catgegory">
			<figure class="item position-relative">
				<img class="w-100" src="${arr[i].strMealThumb}" alt="${arr[i].strMeal}">
        <figcaption class="position-absolute top-0 start-0 bottom-0 end-0 p-3 text-center rounded-3 d-flex align-items-center ">
          <h2>${arr[i].strMeal}</h2>
        </figcaption>
			</figure>
    </div>
    `
  };
  
  document.querySelector(".meal-container").innerHTML = categoriesHTML;
};



function displayMeal() {
  allcCategories = result.meals;
  let categoriesHTML = '';
  for (let i = 0; i < allcCategories.length; i++) {
    categoriesHTML +=
      `
      <div class="col-md-4">
        <figure class="titel-meal ">
          <img class='w-100' src="${allcCategories[i].strMealThumb}" alt="${allcCategories[i].strMeal}">
          <h2 class="text-white">${allcCategories[i].strMeal}</h2>
        </figure>
      </div>
      <div class="text-meals col-md-8">
        <div>
          <div class="text">
            <h3>Instructions</h3>
            <p>${allcCategories[i].strInstructions}</p>
          </div>
          <div>
            <div>
              <span class="detalis">Area :</span>
              <span class="detalis">${allcCategories[i].strArea}</span>
            </div>
            <div>
              <span class="detalis">Category :</span>
              <span class="detalis">${allcCategories[i].strCategory}</span>
            </div>
            <div class="recipes ">
              <h4>Recipes :</h4>
              <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${
                  // Add list items for non-null measure values 
                  Array.from({ length: 20 }, (_, index) => {
                    const measureKey = `strMeasure${index + 1}`;
                    const measureValue = allcCategories[i][measureKey];
                    return measureValue != null && measureValue != ''  && measureValue != ' '? `<li class="alert alert-info m-2 p-1">${measureValue}</li>` : '';
                  }).join('')
                }
              </ul>
            </div>
            <div>
              <h4>Tags :</h4>
              <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${
                  // Add list items for non-null measure values 
                  Array.from({ length: 20 }, (_, index) => {
                    const measureKey = `strIngredient${index + 1}`;
                    const measureValue = allcCategories[i][measureKey];
                    return measureValue != null && measureValue != ''  && measureValue != ' '? `<li class="alert alert-danger m-2 p-1">${measureValue}</li>` : '';
                  }).join('')
                }
              </ul>
              <a class="btn btn-success" href="${allcCategories[i].strSource}">Source</a>
              <a class="btn btn-danger" href="${allcCategories[i].strYoutube}">YouTube</a>
            </div>
          </div>
        </div>
      </div>
    `
    index = i;
  };
  main.innerHTML = categoriesHTML;
};

function getEndPointFilterCategory (category){
  endPoint = `filter.php?c=${category}`;
  console.log(endPoint);
  categories(displaySubCategory);
};

function getEndPointFilterMeals (meals) {
  endPoint = `lookup.php?i=${meals}`;
  console.log(endPoint);
  categories(displayMeal);
};

function getEndPointFilterArea (AreaMeals) {
  endPoint = `filter.php?a=${AreaMeals}`;
  console.log(endPoint);
  categories(filterByArea);
};
function getEndPointFilterIngredient (ingredientMeals) {
  endPoint = `filter.php?i=${ingredientMeals}`;
  console.log(endPoint);
  categories(filterByIngredients);
};

function getEndPointSearchName(name) {
  endPoint = `search.php?s=${name}`;
  console.log(endPoint);
  categories(searchName);
};



function displayAllArea(){
  allcCategories = result.meals
  let categoriesHTML= '';
  for(let i = 0 ; i<allcCategories.length; i++ ){
    categoriesHTML += 
    `
    <div class="col-md-3 card-meal d-flex justify-content-center " data-meals='${allcCategories[i].strArea}'>
					<div class="item d-flex flex-column ">
						<i class="fa-solid fa-house-laptop fa-4x m-auto"></i>
						<div>
							<h2>${allcCategories[i].strArea}</h2>
						</div>
					</div>
				</div>
    `
  }
  main.innerHTML = categoriesHTML;

  const meals = document.querySelectorAll(".card-meal");
  for(let i = 0; i < meals.length; i++) {
    meals[i].addEventListener("click", function(){
      getEndPointFilterArea(meals[i].dataset.meals)
    });
  };

};

function filterByArea(){
  allcCategories = result.meals;
  let categoriesHTML= '';
  for(let i = 0 ; i<allcCategories.length; i++ ){
    categoriesHTML += 
    `
    <div class="col-md-3 card-catgegory" data-meals="${allcCategories[i].idMeal}">
			<figure class="item position-relative">
				<img class="w-100" src="${allcCategories[i].strMealThumb}" alt="${allcCategories[i].strMeal}">
        <figcaption class="position-absolute top-0 start-0 bottom-0 end-0 p-3 text-center rounded-3 d-flex align-items-center ">
          <h2>${allcCategories[i].strMeal}</h2>
        </figcaption>
			</figure>
    </div>
    `
  };
  main.innerHTML = categoriesHTML;

  const meals = document.querySelectorAll(".card-catgegory");
  for(let i = 0; i < meals.length; i++) {
    meals[i].addEventListener("click", function(){
      getEndPointFilterMeals(meals[i].dataset.meals)
    });
  };

}

function displayAllIngredients(){
  allcCategories = result.meals
  console.log(allcCategories[1].strDescription)
  let categoriesHTML= '';
  for(let i = 0 ; i<allcCategories.length; i++ ){
    
    if(allcCategories[i].strDescription != null && allcCategories[i].strDescription != "" ){
      categoriesHTML += 
    `
    <div class="col-md-3 card-meal d-flex justify-content-center" data-meals='${allcCategories[i].strIngredient}'>
					<div class="item d-flex flex-column ">
						<i class="fa-solid fa-drumstick-bite fa-4x m-auto"></i>
						<div class="text-center">
							<h2>${allcCategories[i].strIngredient}</h2>
              <p>${allcCategories[i].strDescription.slice(0, 100)}</p>
						</div>
					</div>
				</div>
    `
  }
    }
  main.innerHTML = categoriesHTML;

  const meals = document.querySelectorAll('.card-meal');
  for(let i =0 ; i < meals.length ; i++){
    meals[i].addEventListener('click', function(){
      getEndPointFilterIngredient(meals[i].dataset.meals)
    })
  }
};

function filterByIngredients(){
  allcCategories = result.meals;
  let categoriesHTML= '';
  for(let i = 0 ; i<allcCategories.length; i++ ){
    categoriesHTML += 
    `
    <div class="col-md-3 card-catgegory" data-meals="${allcCategories[i].idMeal}">
			<figure class="item position-relative">
				<img class="w-100" src="${allcCategories[i].strMealThumb}" alt="${allcCategories[i].strMeal}">
        <figcaption class="position-absolute top-0 start-0 bottom-0 end-0 p-3 text-center rounded-3 d-flex align-items-center ">
          <h2>${allcCategories[i].strMeal}</h2>
        </figcaption>
			</figure>
    </div>
    `
  };
  main.innerHTML = categoriesHTML;

  const meals = document.querySelectorAll(".card-catgegory");
  for(let i = 0; i < meals.length; i++) {
    meals[i].addEventListener("click", function(){
      getEndPointFilterMeals(meals[i].dataset.meals)
    });
  };
};

function searchName(){
  let categoriesHTML=  
    `
    <div class="col-md-6">
      <input  class="form-control nameInput-1" type="text" placeholder="Search By Name">
    </div>
    <div class="col-md-6">
      <input  maxlength="1" class="form-control  letterInput" type="text" placeholder="Search By First Letter">
    </div>  
    `
    
  main.innerHTML = categoriesHTML;

  let container = document.createElement("div")
  container.classList.add("meal-container", "row", 'pt-5')
  main.append(container)

  let searchNameInput = document.querySelector('.nameInput-1');
  let searchLlatterInput = document.querySelector('.letterInput');
  searchNameInput.addEventListener('keyup',  function(){
    let nameValue = searchNameInput.value;
    endPoint = `search.php?s=${nameValue}`;
    categories(displayAllMeals)
    
  });

  searchLlatterInput.addEventListener("keyup", function() {
    let letter = searchLlatterInput.value;
    endPoint = `search.php?f=${letter}`;
    categories(displayAllMeals)
  })

};

function contactUs(){

  let categoriesHTML=  
  `
  <div class="col-md-6">
    <input  class="form-control nameInput" type="text" placeholder="Enter Your Name">
    <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">Special characters and numbers not allowed</div>
  </div>
  <div class="col-md-6">
    <input  maxlength="1" class="form-control  emailInput" type="email" placeholder="Enter Your Email">
    <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none"></div>
  </div>  
  <div class="col-md-6">
    <input  class="form-control phoneInput" type="text" placeholder="Enter Your Phone">
    <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">Enter valid Phone Number</div>
  </div>
  <div class="col-md-6">
    <input  maxlength="1" class="form-control  ageInput" type="number" placeholder="Enter Your Age">
    <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">Enter valid age</div>
  </div>  
  <div class="col-md-6">
    <input  class="form-control passwordInput" type="password" placeholder="Enter Your Password">
    <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">Enter valid password *Minimum eight characters, at least one letter and one number:*</div>
  </div>
  <div class="col-md-6">
    <input  maxlength="1" class="form-control  rePasswordInput" type="password" placeholder="Repassword">
    <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">Enter valid repassword </div>
  </div>  
  <button id="submitBtn" disabled="" class="btn btn-outline-danger  px-2 mt-3">Submit</button>
  `
  
main.innerHTML = categoriesHTML;




};


$('li:nth-child(1)').click(function(){
  searchName();
  $('aside').animate({marginLeft: 0}, 2000);
    $('.close ').html('<i class=" fa-solid open-close-icon fa-2x fa-align-justify "></i>');
});

$('li:nth-child(2)').click(function(){
  endPoint = 'categories.php'
  categories(displayAllCategories)
  $('aside').animate({marginLeft: 0}, 2000);
    $('.close ').html('<i class=" fa-solid open-close-icon fa-2x fa-align-justify "></i>');
});

$('li:nth-child(3)').click(function(){
  endPoint = 'list.php?a=list'
  categories(displayAllArea)
  $('aside').animate({marginLeft: 0}, 2000);
    $('.close ').html('<i class=" fa-solid open-close-icon fa-2x fa-align-justify "></i>');
});

$('li:nth-child(4)').click(function(){
  endPoint = 'list.php?i=list'
  categories(displayAllIngredients)
  $('aside').animate({marginLeft: 0}, 2000);
    $('.close ').html('<i class=" fa-solid open-close-icon fa-2x fa-align-justify "></i>');
});
$('li:nth-child(5)').click(function(){
  contactUs()
  $('aside').animate({marginLeft: 0}, 2000);
    $('.close ').html('<i class=" fa-solid open-close-icon fa-2x fa-align-justify "></i>');
});



$(document).ready(function(){
  $('.loadingScreen').fadeOut(1000, function(){
    $('body').css('overflow', 'visible');
  });
});





nameInput.addEventListener('input', function(){
  validate(nameRegex, nameInput, nameAlert)
});

function validate(regex, element, alert ){
  if(regex.test(element.value )){
    element.classList.add('is-valid');
    element.classList.remove('is-invalid',);
    alert.classList.remove('d-none');
  }else {
    element.classList.add('is-invalid');
    element.classList.remove('is-valid');
  };
};


