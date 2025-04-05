
let listBoards = document.querySelector(".listBoards");
let listStarred = document.querySelector(".listStarred");
let listClosed = document.querySelector(".listClosed");


renderBoard();

let checkEditBoard = false;

function renderBoard() {
  boardInfos = listBoards.querySelectorAll('.boardInfo');
  

  boardInfos.forEach(boardInfo => {
    boardInfo.remove();
  });
  listStarred.innerHTML=``;
  listClosed.innerHTML=``;


  let boardStarred = user.boards.filter((element) => {
    return element.is_starred === true;
  });
  let boardClosed = user.boards.filter((element) => {
    return element.is_closed === true;
  });
  let boardNormal = user.boards.filter((element) => {
    return element.is_closed !== true && element.is_starred !== true;
  });

  boardNormal.forEach((el, index) => {
    let createBoard = listBoards.querySelector(".createBoard");
    let boardInfo = document.createElement("div");
    boardInfo.className = "boardInfo";
    boardInfo.style.background = el.color;
    boardInfo.innerHTML = `
            ${
              el.backdrop
                ? `<img class="backgroundBoard" src="${el.backdrop}" alt="" />`
                : ""
            }
            <div class="overlay"></div>
            <span class="titleBoard">${el.title}</span>
            <div class="editBoard">
              <img src="../css/data/icons/iconEditBoard.png" alt="">
              <span class="textEdit">Edit this board</span>
            </div>`;


            boardInfo.addEventListener("mouseover", function () {
              let editBoard = this.querySelector(".editBoard");
              editBoard.style.display = "flex";
              editBoard.addEventListener("click",function(){
                backgroundId = -1;
                boardId = el.id;
                checkEditBoard = true;
                inputTitle.value = `${el.title}`;
                removeSelectedClass();

                let noticeTitle = document.querySelector(".noticeTitle");
                noticeTitle.textContent = `👋 Please provide a valid board title.`;
                noticeTitle.style.color = "#212529";

                let textHeaderCreate = document.querySelector(".textHeaderCreate");
                textHeaderCreate.textContent = "Update board";

                let createNewBoard = document.querySelector(".createNewBoard");
                createNewBoard.textContent = "Save";
                

                overlayModalCreate.classList.add("show");
                modalCreateBoard.classList.add("displayModal");
                closeModalCreate.addEventListener("click", function () {
                  overlayModalCreate.classList.remove("show");
                  modalCreateBoard.classList.remove("displayModal");
                });
                closeModalCreateFooter.addEventListener("click", function () {
                  overlayModalCreate.classList.remove("show");
                  modalCreateBoard.classList.remove("displayModal");
                });
              
                allBackgroundItems.forEach((item,index) => {
                  item.addEventListener('click', function(event) {
                    removeSelectedClass();
                    let iconSelect = this.querySelector(".selectIconCreate");
                    iconSelect.classList.add('selectedModalCreate');
                    backgroundId = index;
                  });
                });
              })
          });

        boardInfo.addEventListener("mouseout", function () {
          let editBoard = this.querySelector(".editBoard");
          editBoard.style.display = "none";
      });

    let overlay = boardInfo.querySelector(".overlay");
    overlay.addEventListener("click", function () {
      boardId = el.id;
      saveData();
      window.location.href = "../pages/board.html"
      });
    listBoards.insertBefore(boardInfo, createBoard);
  });

  boardStarred.forEach((el, index) => {
    let boardInfoStarred = document.createElement("div");
    boardInfoStarred.className = "boardInfoStarred";
    boardInfoStarred.style.background = el.color;
    boardInfoStarred.innerHTML = `
            ${
              el.backdrop
                ? `<img class="backgroundBoard" src="${el.backdrop}" alt="" />`
                : ""
            }
            <div class="overlay"></div>
            <span class="titleBoard">${el.title}</span>`;
    let overlay = boardInfoStarred.querySelector(".overlay");
    overlay.addEventListener("click", function () {
      boardId = el.id;
      saveData();
      window.location.href = "../pages/board.html"
      });
    listStarred.appendChild(boardInfoStarred);
  });
}

let btnCreateBoard = document.querySelector(".btnCreateBoard");
let overlayModalCreate = document.querySelector(".overlayModalCreate");
let modalCreateBoard = document.querySelector(".modalCreateBoard");
let closeModalCreate = document.querySelector(".closeModalCreate");
let closeModalCreateFooter = document.querySelector(".closeModalCreateFooter");
let createNewBoard = document.querySelector(".createNewBoard");

let backgroundItems = Array.from(document.querySelectorAll('.backgroundCreateInfo'));
let colorItems = Array.from(document.querySelectorAll('.colorCreateInfo'));

let allBackgroundItems = backgroundItems.concat(colorItems);

let inputTitle = document.querySelector(".inputTitle");
let backgroundId = -1;

btnCreateBoard.addEventListener("click", function () {
  backgroundId = -1;

  inputTitle.value = "";
  removeSelectedClass();

  let textHeaderCreate = document.querySelector(".textHeaderCreate");
                textHeaderCreate.textContent = "Create board";

                let createNewBoard = document.querySelector(".createNewBoard");
                createNewBoard.textContent = "Create";
  let noticeTitle = document.querySelector(".noticeTitle");
  noticeTitle.textContent = `👋 Please provide a valid board title.`;
  noticeTitle.style.color = "#212529";

  overlayModalCreate.classList.add("show");
  modalCreateBoard.classList.add("displayModal");
  closeModalCreate.addEventListener("click", function () {
    overlayModalCreate.classList.remove("show");
    modalCreateBoard.classList.remove("displayModal");
  });
  closeModalCreateFooter.addEventListener("click", function () {
    overlayModalCreate.classList.remove("show");
    modalCreateBoard.classList.remove("displayModal");
  });

  allBackgroundItems.forEach((item,index) => {
    item.addEventListener('click', function(event) {
      removeSelectedClass();
      let iconSelect = this.querySelector(".selectIconCreate");
      iconSelect.classList.add('selectedModalCreate');
      backgroundId = index;
    });
  });
});


createNewBoard.addEventListener("click", function () {
  let noticeTitle = document.querySelector(".noticeTitle");
  noticeTitle.textContent = `👋 Please provide a valid board title.`;
  if(inputTitle.value == ""){
    noticeTitle.textContent = `⛔ Title cannot be blank!`;
    noticeTitle.style.color = "red";
  } else if(checkEditBoard){
    if(backgroundId == -1){
      backgroundId = 0;
    }
    let backdropInfo;
    let colorInfo;
    if(backgroundId >= 0 && backgroundId<4){
      backdropInfo = dataBackgrounds[backgroundId];
      colorInfo = false;
    } else if(backgroundId<10){
      backdropInfo = false;
      colorInfo = dataBackgrounds[backgroundId];
    }
    
    let editBoard = user.boards.find(board => board.id == boardId);
    editBoard.title = inputTitle.value;
    editBoard.backdrop = backdropInfo;
    editBoard.color = colorInfo;
    overlayModalCreate.classList.remove("show");
    modalCreateBoard.classList.remove("displayModal");
    saveData();
    renderBoard();
  } else {
    if(backgroundId == -1){
      backgroundId = 0;
    }
    let backdropInfo;
    let colorInfo;
    if(backgroundId >= 0 && backgroundId<4){
      backdropInfo = dataBackgrounds[backgroundId];
      colorInfo = false;
    } else if(backgroundId<10){
      backdropInfo = false;
      colorInfo = dataBackgrounds[backgroundId];
    }
    
    let newBoard = {
      id: user.boards.length > 0 ? user.boards[user.boards.length - 1].id + 1 : 101,
      title: inputTitle.value,
      description: false,
      backdrop: backdropInfo,
      color: colorInfo,
      is_starred: false,
      is_closed: false,
      created_at: new Date().toISOString(),
      lists: [],
    }
    user.boards.push(newBoard);
    overlayModalCreate.classList.remove("show");
    modalCreateBoard.classList.remove("displayModal");
    saveData();
    renderBoard();
  }
});



function removeSelectedClass() {
  allBackgroundItems.forEach(item => {
    let iconSelect = item.querySelector(".selectIconCreate");
    iconSelect.classList.remove('selectedModalCreate');
  });
}



// Media

let listDashboardMedia = document.querySelector(".listDashboardMedia");
let overlaySidebar = document.querySelector(".overlaySidebar");
let sidebar = document.querySelector(".sidebar");

listDashboardMedia.addEventListener("click",function(){
  overlaySidebar.classList.add("showOverlaySidebar");
  sidebar.classList.add("displaySidebar");
  sidebar.classList.remove("hiddenSidebar");
});

overlaySidebar.addEventListener("click",function(){
  closeSidebar();
});

function closeSidebar(){
  sidebar.classList.add("hiddenSidebar");
  overlaySidebar.classList.remove("showOverlaySidebar");
  setTimeout(()=>{
  sidebar.classList.remove("hiddenSidebar");
  sidebar.classList.remove("displaySidebar");
  },500);
}




let headerContent = document.querySelector(".headerContent");
let headerStarred = document.querySelector(".headerStarred");
let headerClosed = document.querySelector(".headerClosed");




function renderStarredBoard(){
  listBoards.style.display = "none";
  listClosed.style.display = "none";
  headerContent.style.display = "none";
  headerClosed.style.display = "none";
  headerStarred.style.display = "flex";
  listStarred.style.display = "flex";

  boardsSidebar.classList.remove("selectActive");
  boardsSidebar.classList.add("transparent");
  starredBoards.classList.add("selectActive");
  starredBoards.classList.remove("transparent");
  closeBoards.classList.remove("selectActive");
  closeBoards.classList.add("transparent");

  listStarred.innerHTML=``;
  let boardStarred = user.boards.filter((element) => {
    return element.is_starred === true;
  });
  boardStarred.forEach((el, index) => {
    let boardInfoStarred = document.createElement("div");
    boardInfoStarred.className = "boardInfoStarred";
    boardInfoStarred.style.background = el.color;
    boardInfoStarred.innerHTML = `
            ${
              el.backdrop
                ? `<img class="backgroundBoard" src="${el.backdrop}" alt="" />`
                : ""
            }
            <div class="overlay"></div>
            <span class="titleBoard">${el.title}</span>`;
    let overlay = boardInfoStarred.querySelector(".overlay");
    overlay.addEventListener("click", function () {
      boardId = el.id;
      saveData();
      window.location.href = "../pages/board.html"
      });
    listStarred.appendChild(boardInfoStarred);
  });
}

function renderClosedBoard(){
  listBoards.style.display = "none";
  listStarred.style.display = "none";
  headerContent.style.display = "none";
  headerStarred.style.display = "none";
  headerClosed.style.display = "flex";
  listClosed.style.display = "flex";

  boardsSidebar.classList.remove("selectActive");
  boardsSidebar.classList.add("transparent");
  closeBoards.classList.add("selectActive");
  closeBoards.classList.remove("transparent");
  starredBoards.classList.remove("selectActive");
  starredBoards.classList.add("transparent");



  listClosed.innerHTML=``;
  let boardClosed = user.boards.filter((element) => {
    return element.is_closed === true;
  });
  boardClosed.forEach((el, index) => {
    let boardInfoClosed = document.createElement("div");
    boardInfoClosed.className = "boardInfoClosed";
    boardInfoClosed.style.background = el.color;
    boardInfoClosed.innerHTML = `
            ${
              el.backdrop
                ? `<img class="backgroundBoard" src="${el.backdrop}" alt="" />`
                : ""
            }
            <div class="overlay"></div>
            <span class="titleBoard">${el.title}</span>`;
    listClosed.appendChild(boardInfoClosed);
  });
}




let boardsSidebar = document.querySelector(".boardsSidebar");
let starredBoards = document.querySelector(".starredBoards");
let closeBoards = document.querySelector(".closeBoards");

starredBoards.addEventListener("click",function(){
  renderStarredBoard();
  closeSidebar();
});

closeBoards.addEventListener("click",function(){
  renderClosedBoard();
  closeSidebar();
});

boardsSidebar.addEventListener("click",function(){
  selelectBoard();
  renderBoard();
  closeSidebar();
})


function selelectBoard(){
  listBoards.style.display = "flex";
  listStarred.style.display = "flex";
  headerContent.style.display = "flex";
  headerStarred.style.display = "flex";
  listClosed.style.display = "flex";

  closeBoards.classList.remove("selectActive");
  closeBoards.classList.add("transparent");
  boardsSidebar.classList.add("selectActive");
  boardsSidebar.classList.remove("transparent");
  starredBoards.classList.remove("selectActive");
  starredBoards.classList.add("transparent");
}

if(openStarredBoards){
  openStarredBoards = false;
  saveData();
  renderStarredBoard();
  closeSidebar();
} else if(openClosedBoards){
  openClosedBoards = false;
  saveData();
  renderClosedBoard();
  closeSidebar();
} else if(openBoards){
  openBoards = false;
  saveData();
  selelectBoard();
  renderBoard();
  closeSidebar();
}