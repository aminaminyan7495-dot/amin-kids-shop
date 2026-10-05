const products=[
{id:1,name:"ست دورس و شلوار کودک",cat:"کودک",price:890000,old:1090000,color:"rose",new:true,sizes:["2","3","4","5"]},
{id:2,name:"سویشرت ساده نوجوان",cat:"پسرانه",price:1190000,old:1390000,color:"dark",new:true,sizes:["8","10","12","14"]},
{id:3,name:"ست دخترانه روزمره",cat:"دخترانه",price:980000,old:0,color:"rose",new:true,sizes:["4","6","8","10"]},
{id:4,name:"هودی مینیمال نوجوان",cat:"پسرانه",price:1250000,old:0,color:"blue",new:false,sizes:["10","12","14","16"]},
{id:5,name:"پیراهن دخترانه",cat:"دخترانه",price:790000,old:950000,color:"rose",new:false,sizes:["4","6","8"]},
{id:6,name:"ست راحتی کودک",cat:"کودک",price:690000,old:0,color:"blue",new:false,sizes:["2","3","4"]},
{id:7,name:"کوله‌پشتی مدرسه",cat:"کیف",price:1150000,old:1350000,color:"dark",new:true,sizes:[]},
{id:8,name:"کیف دوشی نوجوان",cat:"کیف",price:790000,old:0,color:"blue",new:false,sizes:[]}
];
let cart=JSON.parse(localStorage.getItem("aminCart")||"[]");
const $=s=>document.querySelector(s);
const money=n=>n.toLocaleString("fa-IR")+" تومان";
function card(p){return `<article class="product" onclick="openProduct(${p.id})"><div class="product-img ${p.color}">${p.new?'<span class="badge">جدید</span>':''}${p.old?'<span class="badge" style="left:12px;right:auto">تخفیف</span>':''}</div><div class="product-info"><h3>${p.name}</h3><p>${p.cat}</p><div class="price">${p.old?`<span class="old">${money(p.old)}</span>`:""}${money(p.price)}</div></div></article>`}
function render(list=products){$("#productGrid").innerHTML=list.map(card).join("");$("#featured").innerHTML=products.slice(0,4).map(card).join("")}
function updateCart(){localStorage.setItem("aminCart",JSON.stringify(cart));$("#cartCount").textContent=cart.reduce((a,x)=>a+x.qty,0);$("#cartItems").innerHTML=cart.length?cart.map(x=>`<div class="cart-row"><div class="mini-img"></div><div><h4>${x.name}</h4><small>${money(x.price)} × ${x.qty}</small></div><button class="remove" onclick="removeCart(${x.id})">حذف</button></div>`).join(""):"<p style='padding:25px;color:#888;font-size:12px'>سبد خرید شما خالی است.</p>";$("#cartTotal").textContent=money(cart.reduce((a,x)=>a+x.price*x.qty,0))}
function removeCart(id){cart=cart.filter(x=>x.id!==id);updateCart()}
function addCart(id){let p=products.find(x=>x.id===id),x=cart.find(x=>x.id===id);x?x.qty++:cart.push({...p,qty:1});updateCart();closeModal();openCart()}
function openCart(){$("#cartDrawer").classList.add("open");$("#overlay").style.display="block";updateCart()}
function closeCart(){$("#cartDrawer").classList.remove("open");$("#overlay").style.display="none"}
function openProduct(id){let p=products.find(x=>x.id===id);$("#modalContent").innerHTML=`<div class="detail"><div class="detail-img"></div><div><p class="eyebrow">${p.cat}</p><h2>${p.name}</h2><p>محصول با کیفیت از مجموعه جدید پوشاک امین. مناسب استفاده روزمره و راحتی کودک و نوجوان.</p><h3>${money(p.price)}</h3>${p.sizes.length?`<p>انتخاب سایز:</p><div class="sizes">${p.sizes.map(s=>`<button onclick="this.parentNode.querySelectorAll('button').forEach(b=>b.classList.remove('active'));this.classList.add('active')">${s}</button>`).join("")}</div>`:""}<button class="primary full" onclick="addCart(${p.id})">افزودن به سبد خرید</button></div></div>`;$("#productModal").classList.add("show")}
function filter(){let c=$("#category").value,min=+$("#minPrice").value||0,max=+$("#maxPrice").value||Infinity,q=($("#searchInput").value||"").trim();let a=products.filter(p=>(c==="all"||p.cat===c)&&p.price>=min&&p.price<=max&&(!q||p.name.includes(q)));let s=$("#sort").value;if(s==="cheap")a.sort((x,y)=>x.price-y.price);if(s==="expensive")a.sort((x,y)=>y.price-x.price);if(s==="new")a.sort((x,y)=>Number(y.new)-Number(x.new));render(a)}
$("#cartBtn").onclick=openCart;$("#closeCart").onclick=closeCart;$("#overlay").onclick=closeCart;$("#closeModal").onclick=()=>$("#productModal").classList.remove("show");$("#filterBtn").onclick=()=>$("#filters").classList.toggle("open");$("#apply").onclick=filter;$("#sort").onchange=filter;$("#searchBtn").onclick=()=>{$("#searchPanel").classList.add("show");$("#searchInput").focus()};$("#closeSearch").onclick=()=>$("#searchPanel").classList.remove("show");$("#searchInput").oninput=filter;$("#checkoutBtn").onclick=()=>{if(!cart.length)return alert("سبد خرید خالی است.");alert("در نسخه بعدی این بخش به فرم ثبت سفارش و درگاه پرداخت متصل می‌شود.");};$(".menu-btn").onclick=()=>$("#mobileMenu").classList.toggle("open");
render();updateCart();