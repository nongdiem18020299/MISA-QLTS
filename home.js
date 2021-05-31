/**
 * CÁC HÀM CHO TRANG HOME
 */


/**
 * Các hàm cho sidebar
 */

/**
 * HÀM ĐỂ TẠO HIỆU ỨNG DROPDOWN CHO SIDEBAR
 * NTDIEM 30.05.2021
 */
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
  this.classList.toggle("open");
  var dropdownContent = this.nextElementSibling;
  if (dropdownContent.style.display === "block") {
  dropdownContent.style.display = "none";
  } else {
  dropdownContent.style.display = "block";
  }
  });
}