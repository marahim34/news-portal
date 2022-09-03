date = new Date();
year = date.getFullYear();
month = date.getMonth() + 1;
day = date.getDate();
document.getElementById("current-date").innerHTML = day + "/" + month + "/" + year;