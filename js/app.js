const loadAiHub = async() =>{
   const url = `https://openapi.programming-hero.com/api/ai/tools`
   const res = await fetch(url);
   const data = await res.json();
   displayAi(data.data.tools);
}


const displayAi = aihub =>{
   console.log(aihub);
   const aiContainer = document.getElementById('ai-container');
   const seeMore = document.getElementById('seemore');

   if(aihub.length > 10){
      aihub = aihub.slice(0,8);
      seeMore.classList.remove('hidden');
   }
   else{
      seeMore.classList.add('hidden');
   }


   aihub.forEach(ai => {
   const aiDiv = document.createElement('div');

      aiDiv.innerHTML = `
      <div class="!z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 flex flex-col w-full !p-4 3xl:p-![18px] bg-white undefined">
      <div class="h-full w-full">
         <div class="relative w-full">
            <img
               src="${ai.image}"
               class="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full" alt="">
         </div>
         <div class="mb-3 flex items-center justify-between px-1 md:items-start">
            <div class="mb-2">
               <p class="text-xl font-bold text-navy-700"> Features </p>
               <p class="mt-1 text-sm font-medium text-gray-600 md:mt-2">${ai.features[1]}</p>
               <p class="mt-1 text-sm font-medium text-gray-600 md:mt-2">${ai.features[2]}</p>
               <p class="mt-1 text-sm font-medium text-gray-600 md:mt-2">${ai.features[3]}</p>
            </div>
         </div>
         <div class="flex items-center justify-between md:items-center lg:justify-between ">
            <div>
               <p class="text-lg font-bold text-orange-500">${ai.name}</p>
               <p>${ai.published_in} </p>
            </div>
            <button href="" onclick="loadAiDetails('${ai.id}')" class="linear rounded-[20px] bg-orange-100 px-4 py-2 text-base text-xl text-orange-500 transition duration-200 active:bg-orange-300">
               > </button>
         </div>
      </div>
   </div>
      `
      aiContainer.appendChild(aiDiv);
   });
}

const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.closeModal');

closeModal.addEventListener('click', function(){
   modal.classList.add('hidden')
});


const loadAiDetails = async id =>{
   modal.classList.remove('hidden')

   const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
   const res = await fetch(url);
   const data = await res.json();
   showAiDetails(data.data)
}

const showAiDetails = async detail =>{
   console.log(detail)  
   const modaldes = document.getElementById('description');
   modaldes.innerText = detail.description;

   const modalImg = document.getElementById('modal-img');
   modalImg.innerHTML =`<img 
   src="${detail.image_link[0]}"
   class="mb-3 h-full w-full rounded-xl 3xl:h-full 3xl:w-full" alt="">`
   
   const modalBasic = document.getElementById('basic-price');
   modalBasic.innerHTML =`<p> ${detail.pricing[0].price}</p>
   <p> ${detail.pricing[0].plan}</p>`

   const modalMedium = document.getElementById('md-price');
   modalMedium.innerHTML =`<p> ${detail.pricing[1].price}</p>
   <p> ${detail.pricing[0].plan}</p>`

   const modalHigh = document.getElementById('high-price');
   modalHigh.innerHTML =`<p> ${detail.pricing[2].price}</p>
   <p> ${detail.pricing[0].plan}</p>`

   const modalfeatures = document.getElementById('Featureslist');
   modalfeatures.innerHTML =`<li>${detail.features[1].feature_name}</li>
   <li>${detail.features[2].feature_name}</li>
   <li>${detail.features[3].feature_name}</li>`


   const modalIntegration = document.getElementById('integrationList');
   modalIntegration.innerHTML =`<li>${detail.integrations[1]}</li>
   <li>${detail.integrations[2]}</li>
   <li>${detail.integrations[3]}</li>`
}

// see more button


loadAiHub();
