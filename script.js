let cart = [];
let total = 0;

function addToCart(name, price) {
  cart.push({name, price});
  total += price;
  renderCart();
}

function renderCart() {
  const cartEl = document.getElementById("cart");
  cartEl.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.name + " - " + item.price + " ₽";
    cartEl.appendChild(li);
  });
  document.getElementById("total").textContent = total;
}

function sendOrder() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const comment = document.getElementById("comment").value;

  if (!name || !phone || !address || cart.length === 0) {
    alert("Заполните все поля и добавьте товар");
    return;
  }

  let orderText = "🛒 НОВЫЙ ЗАКАЗ\n\n";
  cart.forEach(item => {
    orderText += "• " + item.name + " - " + item.price + " ₽\n";
  });
  orderText += "\n💰 Итого: " + total + " ₽\n";
  orderText += "\n👤 Имя: " + name;
  orderText += "\n📞 Телефон: " + phone;
  orderText += "\n📍 Адрес: " + address;
  orderText += "\n📝 Комментарий: " + comment;

  // 🔴 BURANI DƏYİŞ
  const BOT_TOKEN = "PASTE_BOT_TOKEN_HERE";
  const CHAT_ID = "@Sekard5";

  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: orderText
    })
  })
  .then(() => {
    alert("Заказ отправлен!");
    cart = [];
    total = 0;
    renderCart();
  });
}
