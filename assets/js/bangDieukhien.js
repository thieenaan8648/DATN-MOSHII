// Demo: click menu active
const menuItems = document.querySelectorAll(".menu-item");

menuItems.forEach(item => {
  item.addEventListener("click", () => {
    document.querySelector(".menu-item.active")?.classList.remove("active");
    item.classList.add("active");
  });
});


// Demo: fake update số eSIM hết hạn sau 3s
setTimeout(() => {
  const expired = document.querySelector(".text-danger");
  if (expired) {
    expired.innerText = "50";
  }
}, 3000);

// ===== DATA =====
/*const cards = [
  { title: "Doanh thu", value: "125M", growth: "+12%" },
  { title: "Đơn hàng", value: "156", growth: "+8" },
  { title: "eSIM đã bán", value: "1234" },
  { title: "Đang hoạt động", value: "987" },
  { title: "Sắp hết hạn", value: "45" },
  { title: "Khách mới", value: "23" }
];

const chartData = [40, 60, 30, 80, 50, 90, 70];

const countries = [
  { name: "Việt Nam", value: 85 },
  { name: "Thái Lan", value: 10 },
  { name: "Singapore", value: 5 }
];

const packages = [
  { name: "Gói Data Cao Cấp", total: 456 },
  { name: "Combo Data + Voice", total: 342 },
  { name: "All-in-One", total: 234 }
];

const orders = [
  {
    id: "DH001",
    name: "Nguyễn Thị Mai",
    package: "Gói Data",
    price: "150,000",
    status: "Đã hoàn thành",
    date: "15/4"
  },
  {
    id: "DH002",
    name: "Trần Văn A",
    package: "Combo",
    price: "200,000",
    status: "Đã hoàn thành",
    date: "16/4"
  }
];

// ===== RENDER =====

// Cards
const cardContainer = document.getElementById("bangDieukhien-cards");

cards.forEach(c => {
  cardContainer.innerHTML += `
    <div class="card">
      <div class="card-item">
        <div>
          <div class="title">${c.title}</div>
          <div class="value">${c.value}</div>
        </div>
        <div>${c.growth || ""}</div>
      </div>
    </div>
  `;
});

// Chart
const chart = document.getElementById("chart");

chartData.forEach(v => {
  chart.innerHTML += `<div class="bar" style="height:${v * 2}px"></div>`;
});

// Countries
const countryBox = document.getElementById("countries");

countries.forEach(c => {
  countryBox.innerHTML += `
    <div class="progress">
      <div class="label">
        <span>${c.name}</span>
        <span>${c.value}%</span>
      </div>
      <div class="progress-bar">
        <div style="width:${c.value}%"></div>
      </div>
    </div>
  `;
});

// Packages
const packBox = document.getElementById("top-packages");

packages.forEach((p, i) => {
  packBox.innerHTML += `
    <div>#${i + 1} ${p.name} - ${p.total}</div>
  `;
});

// Orders
const orderBox = document.getElementById("orders");

orders.forEach(o => {
  orderBox.innerHTML += `
    <tr>
      <td>${o.id}</td>
      <td>${o.name}</td>
      <td>${o.package}</td>
      <td>${o.price}</td>
      <td><span class="status success">${o.status}</span></td>
      <td>${o.date}</td>
    </tr>
  `;
});*/