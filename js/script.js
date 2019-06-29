/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


document.addEventListener('DOMContentLoaded', () => {

   //---- Add global variable ----//
   const masterList = document.querySelectorAll('ul .cf'); //store all li to variable 
   const studentNames = document.querySelectorAll('ul h3');
   const studentList = document.querySelector('.student-list');
   let listItems = masterList;

   const pageMaxNum = 10;  //Declare max number per page
   let pagesAmount = listItems.length/pageMaxNum;
   let currentPage = 1;

   //--- Add Search elements --- ///
   const pageHeader= document.querySelector('.page-header');
   const searchDiv = document.createElement('div');
   const searchInput = document.createElement('input');
   const searchButton = document.createElement('button');
   searchDiv.className = 'student-search';
   searchButton.textContent = 'Search';
   searchInput.placeholder = 'Search for students..'
   searchButton.id ='searchBtn';
   pageHeader.appendChild(searchDiv);
   searchDiv.appendChild(searchInput);
   searchDiv.appendChild(searchButton);
   

   //--- Add No Results --//
   const noResults = document.createElement('div');
   noResults.innerHTML = '<p></br>Sorry. No results for search term found.</p></br>';
   studentList.parentNode.insertBefore(noResults,studentList);
   noResults.style.display = 'none';
   


   //--- Hide All list--//
   const hideList = ()=>{
      for(let i = 0; i<masterList.length; i++){
         masterList[i].style.display = 'none';
      }
   };
   //--- Fuction to hide List and show max list per page ---//
   var showPage = (list, page)=>{

      //hide list
      hideList();

      let startIndex = (page*pageMaxNum) - pageMaxNum;
      let endIndex = page*pageMaxNum;
      
  
      //Show List within pagination range
      for(let i = 0; i<list.length; i++){
         if(i>=startIndex && i<endIndex){
            list[i].style.display = ''  
         }
      }
      

   };

   //---- Add pagination ----//
   const parentDiv = document.querySelector('.page'); //Get parent Div

   //Add pagination Div// 
   const pagination = document.createElement('div');
   pagination.className = 'pagination';
   parentDiv.appendChild(pagination);

   //Add Ul//
   const ul = document.createElement('ul');
   pagination.appendChild(ul);


   // Create List element //
   const appendPageLinks = (list)=>{
      //Add Li
      const li = document.createElement('li');
      ul.appendChild(li);
      
      //Set Li properties
      for (let i=0; i < pagesAmount; i++){
         const a = document.createElement('a');
         let counter = i+1;
         a.textContent = counter ;
         a.setAttribute('href','#')
         li.appendChild(a);
      }

   };


   //--Set pagination active class--//
   const activePageClass = ()=>{
      for (let i=0; i < pagesAmount; i++){
         let a = parentDiv.querySelectorAll('a');
         a[i].className = '';
         if((currentPage-1)===i){
            a[i].className = 'active';
         }
      }
   };

   //---Generate List and pagination---//
   showPage(listItems, currentPage); // Generate list
   appendPageLinks(listItems);
   activePageClass(); //Set active pagination page


   //--- Generate list on pagination click ---//
   ul.addEventListener('click',(e)=>{
      currentPage = parseInt(e.target.textContent);
      showPage(listItems, currentPage);
      activePageClass();


   });


   //---Apply search filer---//
   searchButton.addEventListener('click',(e)=>{
      const list = [];
      currentPage = 1;
      let searchValue = searchInput.value;
      for(let i = 0; i<masterList.length; i++){
         if(studentNames[i].textContent.includes(searchValue)){
            list.push(masterList[i]);
         }
      }

      listItems=list;
      pagesAmount = Math.ceil(listItems.length/pageMaxNum);
      //console.log(pagesAmount);
      showPage(listItems, currentPage);
      
      //Show no result message if results not found
      if(listItems.length < 1){
         noResults.style.display = '';
      } else{
         noResults.style.display = 'none';
      }

      ul.innerHTML = '';
      appendPageLinks(listItems);
      
   });
   
});