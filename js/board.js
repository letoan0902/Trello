// Logic ô checkbox Filter (chỉ chọn 1)
document.querySelectorAll(".checkboxFilter").forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    if (this.checked) {
      document.querySelectorAll(".checkboxFilter").forEach((cb) => {
        if (cb !== this) cb.checked = false;
      });
    }
  });
});


// Logic ô textarea 
let myEditor;
document.addEventListener("DOMContentLoaded", function () {
  ClassicEditor.create(document.querySelector("#editor"))
    .then((editor) => {
      myEditor = editor;
    })
    .catch((error) => {
      console.error("Có lỗi xảy ra khi khởi tạo CKEditor:", error);
    });
});

function handleGetValue() {
  console.log("Nội dung:", myEditor.getData());
}


let overlayModal = document.querySelector(".overlayModal");
let overlayModal2 = document.querySelector(".overlayModal2");
let modalCloseBoard = document.querySelector(".modalCloseBoard");

let errorMessage = document.querySelector(".errorMessage");
let btnCloseError = document.querySelector(".btnCloseError");
let textBodyError = document.querySelector(".textBodyError");
let successSignIn = document.querySelector(".successSignIn");

let listBoards = user.boards.filter(board => board.is_closed != true);
let listYourBoards = document.querySelector(".listYourBoards");

function renderListBoards(){
  listBoards = user.boards.filter(board => board.is_closed != true);

  listYourBoards.innerHTML="";
  listBoards.forEach(element => {
    let yourBoardInfo = document.createElement("div");
    yourBoardInfo.className = "yourBoardInfo";
    yourBoardInfo.innerHTML=`
              <div class="backgroundBoardInfo">
              ${element.backdrop
                  ? `<img class="backgroundYourBoard" src="${element.backdrop}" alt="" />`
                  : ""}
              </div>
              <span class="textYourBoard">${element.title}</span>`

    let backgroundBoardInfo = yourBoardInfo.querySelector(".backgroundBoardInfo");
    backgroundBoardInfo.style.background = element.color;

    listYourBoards.appendChild(yourBoardInfo);

    if (element.id === boardId) {
      yourBoardInfo.classList.add("selectYourBoard");
    }

    yourBoardInfo.addEventListener("click", function(){
      let listYourBoardInfo = document.querySelectorAll(".yourBoardInfo");
      listYourBoardInfo.forEach(el => el.classList.remove("selectYourBoard"));
        yourBoardInfo.classList.add("selectYourBoard");
        changeId(element.id);
    });
  })
}


let mainBoard = document.querySelector(".mainBoard");
let headerBoard = document.querySelector(".headerBoard");
function changeId(newId){
  boardId=newId;
  let board = listBoards.find(element => element.id == boardId);


  // Logic header
  headerBoard.innerHTML=`<div class="block1">
            <h2 class="textInfoBoard">${board.title}</h2>
            <div class="starredBoard">
              <img
                class="iconStarred"
                src="../css/data/icons/starred-board.png"
                alt=""
              />
            </div>
            <button class="btnBoard">
              <img
                class="iconBtnBoard"
                src="../css/data/icons/btnBoard.png"
                alt=""
              />
              <span class="textBtnBoard">Board</span>
            </button>
            <div class="tableBoard">
              <img
                class="iconTableBoard"
                src="../css/data/icons/table-board.png"
                alt=""
              />
              <span class="textTable">Table</span>
            </div>
            <div class="btncloseBoard">
              <img src="../css/data/icons/close-board.png" alt="">
              <span class="textCloseBoard">Close this board</span>
            </div>
          </div>
          <div class="block2">
            <img
              class="iconFilter"
              src="../css/data/icons/icon-filter.png"
              alt=""
            />
            <span class="textFilterBlock2">Filter</span>
          </div>`

  let starredBoard = headerBoard.querySelector(".starredBoard");
  starredBoard.addEventListener("click",function(){
    let boardStarred = listBoards.find(element => element.id == boardId);
    if(boardStarred.is_starred == true){
      boardStarred.is_starred = false;
    } else {
      boardStarred.is_starred = true;
      successSignIn.classList.add("displayMessage");
    setTimeout(() => {
      successSignIn.classList.remove("displayMessage");
    }, 1000);
    }
    renderColorStarred();
    saveData();
  })
  renderColorStarred();

  let btncloseBoard = headerBoard.querySelector(".btncloseBoard");
  btncloseBoard.addEventListener("click",function(){
    modalCloseBoard.classList.add("displayModalCloseBoard");
    overlayModal.classList.add("show");
  });



  mainBoard.innerHTML=`<div class="addListCard">
  <input type="text" class="inputAddCard" placeholder="Add another list">
  <img class="iconAddCard" src="../css/data/icons/plus-board.png" alt="">
  <button class="btnAddCard">Add</button>
</div>`

  let addListCard = mainBoard.querySelector(".addListCard");
  addListCard.addEventListener("click",function(){
    let inputAddCard = addListCard.querySelector(".inputAddCard");
      let btnAddCard = addListCard.querySelector(".btnAddCard");
      let iconAddCard = addListCard.querySelector(".iconAddCard");
      let btnCloseError = errorMessage.querySelector(".btnCloseError");


      inputAddCard.classList.add("displayTextFooterTask");
      btnAddCard.classList.add("displayBtnAddCard");
      iconAddCard.classList.add("displayIconAddCard");

      btnAddCard.addEventListener("click",function(){
        textBodyError.innerHTML=``;
        let checkTitle = checkData(inputAddCard.value.trim(),"title");
        if(checkTitle != "valid"){
          let span = document.createElement("span");
          span.className="textDetailed";
          span.textContent=`${checkTitle}`;
          textBodyError.appendChild(span);
          errorMessage.classList.add("displayMessage");
          setTimeout(() => {
          errorMessage.classList.remove("displayMessage");
          }, 2000);
          btnCloseError.addEventListener("click",function(){
            errorMessage.classList.remove("displayMessage");
          })
        } else {
          successSignIn.classList.add("displayMessage");
          setTimeout(() => {
          successSignIn.classList.remove("displayMessage");
          }, 1000);

          let newList = {
            created_at: new Date().toISOString(),
            id: idNewList,
            tasks: [],
            title: inputAddCard.value.trim()
          }
          board.lists.push(newList);
          idNewList++;
          saveData();
          changeId(boardId);
        }
      })
  })




  let lists = [...board.lists];
  lists.forEach(element => {
    let listMainCard = document.createElement("div");
    listMainCard.className="listMainCard";
    listMainCard.innerHTML =`<div class="headerMainCard">
              <p class="textMainCard">${element.title}</p>
              <div class="iconsHeaderMainCard">
                <img
                  class="collapseMainCard"
                  src="../css/data/icons/collapse-maincard.png"
                  alt=""
                />
                <div class="iconMoreTask">
                  <img src="../css/data/icons/more-maincard.png" alt="" />
                </div>
              </div>
            </div>
            <div class="listTasks">
            </div>
            <div class="footerTask">
                <img
                  class="iconPlusTask"
                  src="../css/data/icons/plus-board.png"
                  alt=""
                />
                <input class="textFooterTask" type="text" placeholder="Add a card"></input>
              <div class="listAddCard">
                <img
                  class="iconListAddCard"
                  src="../css/data/icons/list-addcard-board.png"
                  alt=""
                />
              </div>
              <button class="btnAddACard">Add</button>
            </div>`


    // Logic hiện các task
    let listTasks = listMainCard.querySelector(".listTasks");
    let taskGroup = [...element.tasks];
    taskGroup.forEach(task => {
      let taskInfo = document.createElement("div");
      taskInfo.className = "taskInfo";
      taskInfo.innerHTML=`
      ${task.status == "pending"
        ? `<span class="textTask">${task.title}</span>`
        : `<img class="iconCompleteTask" src="../css/data/icons/complete-board.png" alt=""/> <span class="textTask textTaskComplete">${task.title}</span>`
      }`;
      listTasks.appendChild(taskInfo);
    });






    // Logic thêm 1 task mới
    let addCard = listMainCard.querySelector(".footerTask");
    addCard.addEventListener("click",function(){
      let inputCard = addCard.querySelector(".textFooterTask");
      let btnAddACard = addCard.querySelector(".btnAddACard");
      let iconPlusTask = addCard.querySelector(".iconPlusTask");
      let btnCloseError = errorMessage.querySelector(".btnCloseError");


      inputCard.classList.add("displayTextFooterTask");
      btnAddACard.classList.add("displayBtnAddACard");
      iconPlusTask.classList.add("displayIconPlusTask");

      btnAddACard.addEventListener("click",function(){
        textBodyError.innerHTML=``;
        let checkTitle = checkData(inputCard.value.trim(),"title");
        if(checkTitle != "valid"){
          let span = document.createElement("span");
          span.className="textDetailed";
          span.textContent=`${checkTitle}`;
          textBodyError.appendChild(span);
          errorMessage.classList.add("displayMessage");
          setTimeout(() => {
          errorMessage.classList.remove("displayMessage");
          }, 2000);
          btnCloseError.addEventListener("click",function(){
            errorMessage.classList.remove("displayMessage");
          })
        } else {
          successSignIn.classList.add("displayMessage");
          setTimeout(() => {
          successSignIn.classList.remove("displayMessage");
          }, 1000);

          let newTask = {
            created_at: new Date().toISOString(),
            description: "",
            due_date: false,
            id: idNewTask,
            status: "pending",
            tag: [],
            title: inputCard.value.trim()
          }
          element.tasks.push(newTask);
          idNewTask++;
          saveData();
          changeId(boardId);
        }
      })
      
    })

    mainBoard.insertBefore(listMainCard,addListCard);
  
  })

}


// Logic thay đổi màu ô starred
function renderColorStarred(){
  let boardStarred = listBoards.find(element => element.id == boardId);
  let starredBoard = document.querySelector(".starredBoard");
  if(boardStarred.is_starred){
    starredBoard.style.background = "#71a9fc";
  } else {
    starredBoard.style.background= "#F1F2F4";
  }
}
renderListBoards();
changeId(boardId);



// Logic đóng bảng
  let btnAngreeCLoseBoard = document.querySelector(".btnAngreeCLoseBoard");
  let btnCancelCloseBoard = document.querySelector(".btnCancelCloseBoard");
  btnAngreeCLoseBoard.addEventListener("click",function(){
  let boardClosed = listBoards.find(element => element.id == boardId);
    boardClosed.is_closed = true;
  modalCloseBoard.classList.remove("displayModalCloseBoard");
  overlayModal.classList.remove("show");
  listBoards = user.boards.filter(board => board.is_closed !== true);
  saveData();
  if (listBoards.length > 0) {
    boardId = listBoards[0].id;
    renderListBoards();
    changeId(boardId);
  } else {
    window.location.href = "../pages/index.html";
  }
  });
  btnCancelCloseBoard.addEventListener("click",function(){
    modalCloseBoard.classList.remove("displayModalCloseBoard");
    overlayModal.classList.remove("show");
  });




let boardsSidebar = document.querySelector(".boardsSidebar");
let starredBoards = document.querySelector(".starredBoards");
let closeBoards = document.querySelector(".closeBoards");

boardsSidebar.addEventListener("click",function(){
  openBoards = true;
  saveData();
  window.location.href = "../pages/index.html";
});
starredBoards.addEventListener("click",function(){
  openStarredBoards = true;
  saveData();
  window.location.href = "../pages/index.html";
});
closeBoards.addEventListener("click",function(){
  openClosedBoards = true;
  saveData();
  window.location.href = "../pages/index.html";
});
































































// Logic Modal Date 
let currentField = "startDate";
let calendar;

function initializeCalendar(enableTime = false) {
  if (calendar) {
    calendar.destroy();
  }
  calendar = flatpickr("#calendar", {
    inline: true,
    defaultDate: "today",
    dateFormat: enableTime ? "d/m/Y H:i" : "d/m/Y",
    enableTime: enableTime,
    disableMobile: true,
    time_24hr: true,
    onChange: function (selectedDates, dateStr) {
      if (currentField === "startDate") {
        document.getElementById("startDate").value = dateStr;
      } else if (currentField === "dueDate") {
        document.getElementById("dueDate").value = dateStr;
      }
    },
  });
}

document.getElementById("dueDateCheck").addEventListener("change", function () {
  if (this.checked) {
    currentField = "dueDate";
    initializeCalendar(true);
  } else {
    currentField = "startDate";
    initializeCalendar(false);
    document.getElementById("dueDate").value = "";
  }
});

document.querySelector(".dateEdit").addEventListener("click", function () {
  overlayModal2.classList.add("show");
  document.querySelector(".modalDate").style.display = "block";
  if (!calendar) {
    initializeCalendar();
  }
  // Gán ngày hiện tại cho ô input startDate
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0 nên +1
  const year = today.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  document.getElementById("startDate").value = formattedDate;
});





