
let main = document.getElementById('main');
let allcCategories =[];
let endPoint;
let result;
let isOpen = false;

$('.close').click(function(){
  if(isOpen) {
    $('aside').animate({marginLeft: 0}, 2000);
    $('.close ').html('<i class=" fa-solid open-close-icon fa-2x fa-align-justify "></i>');
    isOpen = false;
  } else {
    $('aside').animate({marginLeft: 275}, 1000);
    $('.close ').html('<i class=" fa-solid open-close-icon fa-2x fa-x"></i>');
    isOpen = true;
  }
});

async function categories(fun){
  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/${endPoint}`);
  result = await res.json();
  fun();
};

function test (category){
  endPoint = `filter.php?c=${category}`;
  console.log(endPoint);
  categories(displaySubCategory);
}

function displayAllCategories(){
  allcCategories = result.categories
  console.log(allcCategories[0].strCategory);
  console.log(typeof allcCategories[0].strCategory);
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

  const cards = document.querySelectorAll(".card-catgegory")
  for(let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function(){
      test(cards[i].dataset.category)
    })
  }
};


function displaySubCategory() {
  allcCategories = result.meals;
  let categoriesHTML= '';
  for(let i = 0 ; i<allcCategories.length; i++ ){
    categoriesHTML += 
    `
    <div class="col-md-3 card-catgegory" >
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

function displayAllArea(){
  allcCategories = result.meals
  let categoriesHTML= '';
  for(let i = 0 ; i<allcCategories.length; i++ ){
    categoriesHTML += 
    `
    <div class="col-md-3 card-meal d-flex justify-content-center">
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
}

function displayAllIngredients(){
  allcCategories = result.meals
  console.log(allcCategories[1].strDescription)
  let categoriesHTML= '';
  for(let i = 0 ; i<allcCategories.length; i++ ){
    
    if(allcCategories[i].strDescription != null && allcCategories[i].strDescription != "" ){
      categoriesHTML += 
    `
    <div class="col-md-3 card-meal d-flex justify-content-center">
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
}

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



