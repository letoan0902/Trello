let listBoards = document.querySelector(".listBoards");
let listStarred = document.querySelector(".listStarred");
let listClosed = document.querySelector(".listClosed");
let btnCreateBoard = document.querySelector(".btnCreateBoard");
let overlayModalCreate = document.querySelector(".overlayModalCreate");
let modalCreateBoard = document.querySelector(".modalCreateBoard");
let closeModalCreate = document.querySelector(".closeModalCreate");
let closeModalCreateFooter = document.querySelector(".closeModalCreateFooter");
let createNewBoard = document.querySelector(".createNewBoard");
let inputTitle = document.querySelector(".inputTitle");
let boardsSidebar = document.querySelector(".boardsSidebar");
let starredBoards = document.querySelector(".starredBoards");
let closeBoards = document.querySelector(".closeBoards");
let headerContent = document.querySelector(".headerContent");
let headerStarred = document.querySelector(".headerStarred");
let headerClosed = document.querySelector(".headerClosed");
let backgroundItems = Array.from(
  document.querySelectorAll(".backgroundCreateInfo")
);
let colorItems = Array.from(document.querySelectorAll(".colorCreateInfo"));
let allBackgroundItems = backgroundItems.concat(colorItems);

let checkEditBoard = false;
let backgroundId = -1;
let currentView = "all";

// Logic creare board
function createBoard(board, checkEdit) {
  let div = document.createElement("div");
  div.className = "boardInfo";
  div.style.background = board.color;
  div.innerHTML = `
    ${
      board.backdrop
        ? `<img class="backgroundBoard" src="${board.backdrop}" alt="" />`
        : ""
    }
    <div class="overlay"></div>
    <span class="titleBoard">${board.title}</span>
      <div class="editBoard">
        <img src="../css/data/icons/iconEditBoard.png" alt="">
        <span class="textEdit">Edit this board</span>
      </div>`;

  if (checkEdit) {
    div.addEventListener("mouseover", function () {
      div.querySelector(".editBoard").style.display = "flex";
    });
    div.addEventListener("mouseout", function () {
      div.querySelector(".editBoard").style.display = "none";
    });
    div.querySelector(".editBoard").addEventListener("click", function () {
      boardId = board.id;
      openModal(true);
    });
    div.querySelector(".overlay").addEventListener("click", function () {
      boardId = board.id;
      saveData();
      window.location.href = "../pages/board.html";
    });
  }

  return div;
}

// Logic render boards vào containerList
function renderBoards(boards, containerList, checkEdit, buttonCreate = null) {
  if (buttonCreate) {
    Array.from(containerList.querySelectorAll(".boardInfo")).forEach((el) =>
      el.remove()
    );
  } else {
    containerList.innerHTML = "";
  }
  boards.forEach((board) => {
    let boardElement = createBoard(board, checkEdit);
    buttonCreate
      ? containerList.insertBefore(boardElement, buttonCreate)
      : containerList.appendChild(boardElement);
  });
}

// Logic change view
function setView(view) {
  currentView = view;
  let createBoard = listBoards.querySelector(".createBoard");
  let normalBoardsList = user.boards.filter(
    (board) => !board.is_closed && !board.is_starred
  );
  let starredBoardsList = user.boards.filter((board) => board.is_starred);
  let closedBoardsList = user.boards.filter((board) => board.is_closed);

  if (view == "all") {
    listBoards.style.display = "flex";
    listStarred.style.display = "flex";
    listClosed.style.display = "none";
    headerContent.style.display = "flex";
    headerStarred.style.display = "flex";
    headerClosed.style.display = "none";
    renderBoards(normalBoardsList, listBoards, true, createBoard);
    renderBoards(starredBoardsList, listStarred, true);
  } else if (view == "starred") {
    listBoards.style.display = "none";
    listStarred.style.display = "flex";
    listClosed.style.display = "none";
    headerContent.style.display = "none";
    headerStarred.style.display = "flex";
    headerClosed.style.display = "none";
    renderBoards(starredBoardsList, listStarred, true);
  } else if (view == "closed") {
    listBoards.style.display = "none";
    listStarred.style.display = "none";
    listClosed.style.display = "flex";
    headerContent.style.display = "none";
    headerStarred.style.display = "none";
    headerClosed.style.display = "flex";
    renderBoards(closedBoardsList, listClosed, false);
  }

  // Logic sidebar
  boardsSidebar.classList.toggle("selectActive", view === "all");
  boardsSidebar.classList.toggle("transparent", view !== "all");
  starredBoards.classList.toggle("selectActive", view === "starred");
  starredBoards.classList.toggle("transparent", view !== "starred");
  closeBoards.classList.toggle("selectActive", view === "closed");
  closeBoards.classList.toggle("transparent", view !== "closed");
}

// Logic open modal create/edit board
function openModal(isEdit) {
  checkEditBoard = isEdit;
  let noticeTitle = document.querySelector(".noticeTitle");
  let textHeaderCreate = document.querySelector(".textHeaderCreate");
  let createNewBoardBtn = document.querySelector(".createNewBoard");

  noticeTitle.textContent = "👋 Please provide a valid board title.";
  noticeTitle.style.color = "#212529";
  overlayModalCreate.classList.add("show");
  modalCreateBoard.classList.add("displayModal");

  if (isEdit) {
    let board = user.boards.find((board) => board.id === boardId);
    inputTitle.value = board.title;
    removeSelectedClass();
    let currentBackground = board.backdrop || board.color;
    backgroundId = dataBackgrounds.indexOf(currentBackground);
    if (backgroundId !== -1) {
      allBackgroundItems[backgroundId]
        .querySelector(".selectIconCreate")
        .classList.add("selectedModalCreate");
    }
    textHeaderCreate.textContent = "Update board";
    createNewBoardBtn.textContent = "Save";
  } else {
    inputTitle.value = "";
    backgroundId = 0;
    removeSelectedClass();
    allBackgroundItems[backgroundId]
        .querySelector(".selectIconCreate")
        .classList.add("selectedModalCreate");
    textHeaderCreate.textContent = "Create board";
    createNewBoardBtn.textContent = "Create";
  }

  closeModalCreate.addEventListener("click", closeModal);
  closeModalCreateFooter.addEventListener("click", closeModal);
  allBackgroundItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      removeSelectedClass();
      item
        .querySelector(".selectIconCreate")
        .classList.add("selectedModalCreate");
      backgroundId = index;
    });
  });
}

function closeModal() {
  overlayModalCreate.classList.remove("show");
  modalCreateBoard.classList.remove("displayModal");
}

// Logic btn create board
createNewBoard.addEventListener("click", function () {
  let noticeTitle = document.querySelector(".noticeTitle");
  let checkTitleBoard = checkData(inputTitle.value,"checktitleboard");
  if (inputTitle.value === "") {
    noticeTitle.textContent = "⛔ Title cannot be blank!";
    noticeTitle.style.color = "red";
    return;
  } else if(checkTitleBoard != "valid"){
    noticeTitle.textContent = checkTitleBoard;
    noticeTitle.style.color = "red";
  } else {

  let backdropInfo =
    backgroundId >= 0 && backgroundId < 4
      ? dataBackgrounds[backgroundId]
      : backgroundId === -1
      ? dataBackgrounds[0]
      : null;
  let colorInfo =
    backgroundId >= 4 && backgroundId < 10
      ? dataBackgrounds[backgroundId]
      : null;

  if (checkEditBoard) {
    let editBoard = user.boards.find((board) => board.id === boardId);
    editBoard.title = inputTitle.value;
    editBoard.backdrop = backdropInfo;
    editBoard.color = colorInfo;
  } else {
    let newBoard = {
      id:
        user.boards.length > 0
          ? user.boards[user.boards.length - 1].id + 1
          : 101,
      title: inputTitle.value,
      description: false,
      backdrop: backdropInfo,
      color: colorInfo,
      is_starred: false,
      is_closed: false,
      created_at: new Date().toISOString(),
      lists: [],
    };
    user.boards.push(newBoard);
  }
  

  closeModal();
  saveData();
  setView(currentView);
}
});

// Logic remove selected background
function removeSelectedClass() {
  allBackgroundItems.forEach((item) => {
    item
      .querySelector(".selectIconCreate")
      .classList.remove("selectedModalCreate");
  });
}

// Logic click sidebar
btnCreateBoard.addEventListener("click", function () {
  openModal(false);
});
boardsSidebar.addEventListener("click", function () {
  setView("all");
  closeSidebar();
});
starredBoards.addEventListener("click", function () {
  setView("starred");
  closeSidebar();
});
closeBoards.addEventListener("click", function () {
  setView("closed");
  closeSidebar();
});

// Check open
if (openStarredBoards) {
  openStarredBoards = false;
  saveData();
  setView("starred");
} else if (openClosedBoards) {
  openClosedBoards = false;
  saveData();
  setView("closed");
} else {
  setView("all");
}

// Logic sidebar media
let listDashboardMedia = document.querySelector(".listDashboardMedia");
let overlaySidebar = document.querySelector(".overlaySidebar");
let sidebar = document.querySelector(".sidebar");

listDashboardMedia.addEventListener("click", function () {
  overlaySidebar.classList.add("showOverlaySidebar");
  sidebar.classList.add("displaySidebar");
  sidebar.classList.remove("hiddenSidebar");
});

overlaySidebar.addEventListener("click", closeSidebar);

function closeSidebar() {
  sidebar.classList.add("hiddenSidebar");
  overlaySidebar.classList.remove("showOverlaySidebar");
  setTimeout(() => {
    sidebar.classList.remove("hiddenSidebar");
    sidebar.classList.remove("displaySidebar");
  }, 500);
}

//Log out
document.querySelector(".SignOut").addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "../pages/login.html";
});
