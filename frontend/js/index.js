





//------------------------------------------MÃ BẮT LỖI LAYOUT RESPONSIVE---------------------------------------------------------------
// console.log('📏 Viewport width:', window.innerWidth);
// console.log('📜 Document scrollWidth:', document.documentElement.scrollWidth);

// if (document.documentElement.scrollWidth > window.innerWidth) {
//   console.warn('⚠️ Có phần tử bị tràn ngang!');
// } else {
//   console.log('✅ Không có lỗi tràn ngang.');
// }

// Đánh dấu phần tử bị tràn và thông báo lệch bao nhiêu px xem số kế bên chữ Right/Left trừ cho Viewport hiện tại
// document.querySelectorAll('*').forEach(el => {
//   const rect = el.getBoundingClientRect();

//   if (rect.right > window.innerWidth) {
//     console.log('➡️ Phần tử tràn bên phải:', el, 'Right:', rect.right);
//     el.style.outline = '8px solid green';
//   }

//   if (rect.left < 0) {
//     console.log('⬅️ Phần tử tràn bên trái:', el, 'Left:', rect.left);
//     el.style.outline = '8px solid blue';
//   }
// });




// ---------------Gửi dữ liệu đến Back-end(sever) bằng thư viện axios và thư viện Jquery
// import {postDataCustomer} from './apis';
//---API-------------- lay list khach hang ve tu api voi axios

const getCustomer = async () => {
  try {
    // Không cần truyền data cho GET request
    const response = await axios.get("https://ver-dhn-ningen-dock-bernard-fullstacks.vercel.app/api/informations"); 

    console.log("✅ Get Customer success:", response.data);
  } catch (error) {
    console.error("❌ Get Customer failed:", error.response?.data || error.message);
  }
};
// ---API-------------- post khách hàn mới đăng ký form lên backend với api voi axios
// gửi dữ liệu lên cho backend
const postCustomer = async (data) => {
  const nameCustomer = document.getElementById("name").value;
  try {
    // Gửi thông tin lên backend
    const response = await axios.post("https://ver-dhn-ningen-dock-bernard-fullstacks.vercel.app/api/informations", data);
    
    console.log("✅ Post Customer success:", response.data);

    // Hiển thị thông báo thành công
    Swal.fire({
      icon: "success",
      title: `Xin cảm ơn ${nameCustomer}!`,
      text: `Chúng tôi sẽ sớm liên hệ với bạn!`,
      confirmButtonColor: "#28a745",
      background: "#e6f7e6",
      color: "#2d862d",
      width: "400px",
      timer: 3000,
      customClass: {
        popup: "swal__popup swal--success",
        title: "swal__title swal--success-title",
        confirmButton: "swal__confirm-btn swal--success-btn",
      },
    });

  } catch (error) {
    console.error("❌ Post Customer failed:", error.response?.data || error.message);
    
    // Kiểm tra lỗi 429 - chống spam
    if (error.response && error.response.status === 429) {
      Swal.fire({
        icon: "warning",
        title: "Bạn gửi quá nhiều lần!",
        text: "Vui lòng thử lại sau 15 phút.",
        confirmButtonColor: "#ff9800",
        background: "#fff3cd",
        color: "#856404",
        width: "400px",
        timer: 3000,
        customClass: {
          popup: "swal__popup swal--warning",
          title: "swal__title swal--warning-title",
          confirmButton: "swal__confirm-btn swal--warning-btn",
        },
      });
      return; // Dừng không chạy thông báo lỗi chung
    }

    // Hiển thị lỗi chung nếu không phải lỗi 429
    Swal.fire({
      icon: "error",
      title: "Xin vui lòng thử lại!",
      text: "Gửi form thất bại, vui lòng thử lại.",
      confirmButtonColor: "#d33",
      background: "#fde8e8",
      color: "#d32f2f",
      width: "400px",
      timer: 3000,
      customClass: {
        popup: "swal__popup swal--error",
        title: "swal__title swal--error-title",
        confirmButton: "swal__confirm-btn swal--error-btn",
      },
    });
  }
};



// lay du lieu nguoi dung nhap tu form 
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("contactForm").addEventListener("submit", function (event) {


      event.preventDefault(); // Ngăn chặn reload trang

      // Lấy dữ liệu từ form
      const formData = {
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          tel: document.getElementById("tel").value
      };

      console.log("Dữ liệu Form:", formData); // Log dữ liệu ra console
   
      //dua du lieu vao ham putCustomer va chong spam
      postCustomer(formData)
      //dua het input ve rong
      document.getElementById("name").value="";
      document.getElementById("email").value="";
      document.getElementById("tel").value="";
  });
});

//------------  Contact button
const contacts = [
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<linearGradient id="kVR4WAMiBT-ffYOHy6lJja_COxxOBCCKtwj_gr1" x1="14.111" x2="34.153" y1="-5.971" y2="51.731" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fcfcfc"></stop><stop offset=".495" stop-color="#f4f4f4"></stop><stop offset=".946" stop-color="#e8e8e8"></stop><stop offset="1" stop-color="#e8e8e8"></stop></linearGradient><path fill="url(#kVR4WAMiBT-ffYOHy6lJja_COxxOBCCKtwj_gr1)" d="M24,5C21.361,5,13.33,5,8.89,9.054	C6.246,11.688,5,15.494,5,21v3c0,5.506,1.246,9.312,3.921,11.976c1.332,1.215,3.148,2.186,5.368,2.857L15,39.047v5.328	C15,45,15.181,45,15.241,45c0.123,0,0.32-0.039,0.694-0.371c0.09-0.089,0.75-0.803,3.96-4.399l0.324-0.363l0.485,0.031	C21.779,39.965,22.888,40,24,40c2.639,0,10.67,0,15.11-4.055C41.753,33.311,43,29.505,43,24v-3c0-5.506-1.246-9.312-3.921-11.976	C34.67,5,26.639,5,24,5z"></path><linearGradient id="kVR4WAMiBT-ffYOHy6lJjb_COxxOBCCKtwj_gr2" x1="42.608" x2="2.522" y1="48.397" y2="-7.263" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#912fbd"></stop><stop offset="1" stop-color="#9332bf"></stop></linearGradient><path fill="url(#kVR4WAMiBT-ffYOHy6lJjb_COxxOBCCKtwj_gr2)" d="M33.451,28.854	c-1.111-0.936-1.624-1.219-3.158-2.14C29.654,26.331,28.68,26,28.169,26c-0.349,0-0.767,0.267-1.023,0.523	C26.49,27.179,26.275,28,25.125,28c-1.125,0-3.09-1.145-4.5-2.625C19.145,23.965,18,22,18,20.875c0-1.15,0.806-1.38,1.462-2.037	C19.718,18.583,20,18.165,20,17.816c0-0.511-0.331-1.47-0.714-2.109c-0.921-1.535-1.203-2.048-2.14-3.158	c-0.317-0.376-0.678-0.548-1.056-0.549c-0.639-0.001-1.478,0.316-2.046,0.739c-0.854,0.637-1.747,1.504-1.986,2.584	c-0.032,0.147-0.051,0.295-0.057,0.443c-0.046,1.125,0.396,2.267,0.873,3.234c1.123,2.279,2.609,4.485,4.226,6.455	c0.517,0.63,1.08,1.216,1.663,1.782c0.566,0.582,1.152,1.145,1.782,1.663c1.97,1.617,4.176,3.103,6.455,4.226	c0.958,0.472,2.086,0.906,3.2,0.874c0.159-0.005,0.318-0.023,0.477-0.058c1.08-0.238,1.947-1.132,2.584-1.986	c0.423-0.568,0.74-1.406,0.739-2.046C33.999,29.532,33.827,29.171,33.451,28.854z M34,24c-0.552,0-1-0.448-1-1v-1	c0-4.962-4.038-9-9-9c-0.552,0-1-0.448-1-1s0.448-1,1-1c6.065,0,11,4.935,11,11v1C35,23.552,34.552,24,34,24z M27.858,22	c-0.444,0-0.85-0.298-0.967-0.748c-0.274-1.051-1.094-1.872-2.141-2.142c-0.535-0.139-0.856-0.684-0.718-1.219	c0.138-0.534,0.682-0.855,1.219-0.718c1.748,0.453,3.118,1.822,3.575,3.574c0.139,0.535-0.181,1.08-0.715,1.22	C28.026,21.989,27.941,22,27.858,22z M31,23c-0.552,0-1-0.448-1-1c0-3.188-2.494-5.818-5.678-5.986	c-0.552-0.029-0.975-0.5-0.946-1.051c0.029-0.552,0.508-0.976,1.051-0.946C28.674,14.241,32,17.748,32,22C32,22.552,31.552,23,31,23	z M24,4C19.5,4,12.488,4.414,8.216,8.316C5.196,11.323,4,15.541,4,21c0,0.452-0.002,0.956,0.002,1.5C3.998,23.043,4,23.547,4,23.999	c0,5.459,1.196,9.677,4.216,12.684c1.626,1.485,3.654,2.462,5.784,3.106v4.586C14,45.971,15.049,46,15.241,46h0.009	c0.494-0.002,0.921-0.244,1.349-0.624c0.161-0.143,2.02-2.215,4.042-4.481C21.845,40.972,22.989,41,23.999,41l0,0l0,0	c4.5,0,11.511-0.415,15.784-4.317c3.019-3.006,4.216-7.225,4.216-12.684c0-0.452,0.002-0.956-0.002-1.5	c0.004-0.544,0.002-1.047,0.002-1.5c0-5.459-1.196-9.677-4.216-12.684C35.511,4.414,28.5,4,24,4z M41,23.651v0.348	c0,4.906-1.045,8.249-3.286,10.512C33.832,38,26.437,38,23.999,38c-0.742,0-1.946-0.001-3.367-0.1	C20.237,38.344,16,43.083,16,43.083V37.22c-2.104-0.505-4.183-1.333-5.714-2.708C8.045,32.248,7,28.905,7,23.999v-0.348	c0-0.351-0.001-0.73,0.002-1.173C6.999,22.078,6.999,21.7,7,21.348V21c0-4.906,1.045-8.249,3.286-10.512	C14.167,6.999,21.563,6.999,24,6.999s9.832,0,13.713,3.489c2.242,2.263,3.286,5.606,3.286,10.512v0.348	c0,0.351,0.001,0.73-0.002,1.173C41,22.922,41,23.3,41,23.651z"></path>
</svg>`,
    link: "https://www.viber.com/vi/",
    name: "viber",
  },
   {
    icon: `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="red" xmlns="http://www.w3.org/2000/svg">
 <path d="M14.0497 6C15.0264 6.19057 15.924 6.66826 16.6277 7.37194C17.3314 8.07561 17.8091 8.97326 17.9997 9.95M14.0497 2C16.0789 2.22544 17.9713 3.13417 19.4159 4.57701C20.8606 6.01984 21.7717 7.91101 21.9997 9.94M10.2266 13.8631C9.02506 12.6615 8.07627 11.3028 7.38028 9.85323C7.32041 9.72854 7.29048 9.66619 7.26748 9.5873C7.18576 9.30695 7.24446 8.96269 7.41447 8.72526C7.46231 8.65845 7.51947 8.60129 7.63378 8.48698C7.98338 8.13737 8.15819 7.96257 8.27247 7.78679C8.70347 7.1239 8.70347 6.26932 8.27247 5.60643C8.15819 5.43065 7.98338 5.25585 7.63378 4.90624L7.43891 4.71137C6.90747 4.17993 6.64174 3.91421 6.35636 3.76987C5.7888 3.4828 5.11854 3.4828 4.55098 3.76987C4.2656 3.91421 3.99987 4.17993 3.46843 4.71137L3.3108 4.86901C2.78117 5.39863 2.51636 5.66344 2.31411 6.02348C2.08969 6.42298 1.92833 7.04347 1.9297 7.5017C1.93092 7.91464 2.01103 8.19687 2.17124 8.76131C3.03221 11.7947 4.65668 14.6571 7.04466 17.045C9.43264 19.433 12.295 21.0575 15.3284 21.9185C15.8928 22.0787 16.1751 22.1588 16.588 22.16C17.0462 22.1614 17.6667 22 18.0662 21.7756C18.4263 21.5733 18.6911 21.3085 19.2207 20.7789L19.3783 20.6213C19.9098 20.0898 20.1755 19.8241 20.3198 19.5387C20.6069 18.9712 20.6069 18.3009 20.3198 17.7333C20.1755 17.448 19.9098 17.1822 19.3783 16.6508L19.1835 16.4559C18.8339 16.1063 18.6591 15.9315 18.4833 15.8172C17.8204 15.3862 16.9658 15.3862 16.3029 15.8172C16.1271 15.9315 15.9523 16.1063 15.6027 16.4559C15.4884 16.5702 15.4313 16.6274 15.3644 16.6752C15.127 16.8453 14.7828 16.904 14.5024 16.8222C14.4235 16.7992 14.3612 16.7693 14.2365 16.7094C12.7869 16.0134 11.4282 15.0646 10.2266 13.8631Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
 </svg>
`,
        link: "tel:+123456789",
        name: "phone",
   },
   {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
    <path fill="#f55376" d="M12,22.854V10.445l12,9l12-9v12.409l-12,9L12,22.854z"></path><path fill="#6c19ff" d="M12,22.854l-9-6.75v21.032C3,38.721,4.284,40,5.864,40H12V22.854z"></path><path fill="#eb0000" d="M12,10.445L9.873,8.85C7.038,6.726,3,8.745,3,12.286v3.818l9,6.75V10.445z"></path><path fill="#3ddab4" d="M36,22.854V40h6.136C43.721,40,45,38.716,45,37.136V16.105L36,22.854z"></path><path fill="#f5bc00" d="M38.127,8.85L36,10.445v12.409l9-6.75v-3.818C45,8.745,40.958,6.726,38.127,8.85z"></path>
    </svg>`,
        link: "https://accounts.google.com/v3/signin/identifier?hl=vi&ifkv=AS5LTAQkuyw1McKmWEk19l9pfijIsYAsUg6qZIXoy3v1VYUMQrQMCevXQ9PN8YKV2EUUDkZ4J1iug&flowName=WebLiteSignIn&flowEntry=ServiceLogin&dsh=S-1627386162%3A1717960490914598",
        name: "mail",
   },
   {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path fill="#fff" d="M4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5c5.1,0,9.8,2,13.4,5.6	C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19c0,0,0,0,0,0h0c-3.2,0-6.3-0.8-9.1-2.3L4.9,43.3z"></path><path fill="#fff" d="M4.9,43.8c-0.1,0-0.3-0.1-0.4-0.1c-0.1-0.1-0.2-0.3-0.1-0.5L7,33.5c-1.6-2.9-2.5-6.2-2.5-9.6	C4.5,13.2,13.3,4.5,24,4.5c5.2,0,10.1,2,13.8,5.7c3.7,3.7,5.7,8.6,5.7,13.8c0,10.7-8.7,19.5-19.5,19.5c-3.2,0-6.3-0.8-9.1-2.3	L5,43.8C5,43.8,4.9,43.8,4.9,43.8z"></path><path fill="#cfd8dc" d="M24,5c5.1,0,9.8,2,13.4,5.6C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19h0c-3.2,0-6.3-0.8-9.1-2.3	L4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5 M24,43L24,43L24,43 M24,43L24,43L24,43 M24,4L24,4C13,4,4,13,4,24	c0,3.4,0.8,6.7,2.5,9.6L3.9,43c-0.1,0.3,0,0.7,0.3,1c0.2,0.2,0.4,0.3,0.7,0.3c0.1,0,0.2,0,0.3,0l9.7-2.5c2.8,1.5,6,2.2,9.2,2.2	c11,0,20-9,20-20c0-5.3-2.1-10.4-5.8-14.1C34.4,6.1,29.4,4,24,4L24,4z"></path><path fill="#40c351" d="M35.2,12.8c-3-3-6.9-4.6-11.2-4.6C15.3,8.2,8.2,15.3,8.2,24c0,3,0.8,5.9,2.4,8.4L11,33l-1.6,5.8	l6-1.6l0.6,0.3c2.4,1.4,5.2,2.2,8,2.2h0c8.7,0,15.8-7.1,15.8-15.8C39.8,19.8,38.2,15.8,35.2,12.8z"></path><path fill="#fff" fill-rule="evenodd" d="M19.3,16c-0.4-0.8-0.7-0.8-1.1-0.8c-0.3,0-0.6,0-0.9,0	s-0.8,0.1-1.3,0.6c-0.4,0.5-1.7,1.6-1.7,4s1.7,4.6,1.9,4.9s3.3,5.3,8.1,7.2c4,1.6,4.8,1.3,5.7,1.2c0.9-0.1,2.8-1.1,3.2-2.3	c0.4-1.1,0.4-2.1,0.3-2.3c-0.1-0.2-0.4-0.3-0.9-0.6s-2.8-1.4-3.2-1.5c-0.4-0.2-0.8-0.2-1.1,0.2c-0.3,0.5-1.2,1.5-1.5,1.9	c-0.3,0.3-0.6,0.4-1,0.1c-0.5-0.2-2-0.7-3.8-2.4c-1.4-1.3-2.4-2.8-2.6-3.3c-0.3-0.5,0-0.7,0.2-1c0.2-0.2,0.5-0.6,0.7-0.8	c0.2-0.3,0.3-0.5,0.5-0.8c0.2-0.3,0.1-0.6,0-0.8C20.6,19.3,19.7,17,19.3,16z" clip-rule="evenodd"></path>
</svg>`,
        link: "https://accounts.google.com/v3/signin/identifier?hl=vi&ifkv=AS5LTAQkuyw1McKmWEk19l9pfijIsYAsUg6qZIXoy3v1VYUMQrQMCevXQ9PN8YKV2EUUDkZ4J1iug&flowName=WebLiteSignIn&flowEntry=ServiceLogin&dsh=S-1627386162%3A1717960490914598",
        name: "whatsapp",
   },
  {
    icon: `<svg width="100" height="100" viewBox="0 0 24 24"><path fill="#0078FF" d="M12 2C6.48 2 2 6.25 2 11.48c0 2.92 1.32 5.54 3.42 7.29V22l3.13-1.71c1.01.28 2.08.43 3.21.43 5.52 0 10-4.25 10-9.48C22 6.25 17.52 2 12 2Zm.35 11.32-2.51-2.68-5.07 2.68 6.96-7.32 2.51 2.68 5.07-2.68-6.96 7.32Z"/></svg>`,
    link: "https://www.messenger.com/?locale=vi_VN",
    name: "messenger",
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path fill="#2962ff" d="M15,36V6.827l-1.211-0.811C8.64,8.083,5,13.112,5,19v10c0,7.732,6.268,14,14,14h10	c4.722,0,8.883-2.348,11.417-5.931V36H15z"></path><path fill="#eee" d="M29,5H19c-1.845,0-3.601,0.366-5.214,1.014C10.453,9.25,8,14.528,8,19	c0,6.771,0.936,10.735,3.712,14.607c0.216,0.301,0.357,0.653,0.376,1.022c0.043,0.835-0.129,2.365-1.634,3.742	c-0.162,0.148-0.059,0.419,0.16,0.428c0.942,0.041,2.843-0.014,4.797-0.877c0.557-0.246,1.191-0.203,1.729,0.083	C20.453,39.764,24.333,40,28,40c4.676,0,9.339-1.04,12.417-2.916C42.038,34.799,43,32.014,43,29V19C43,11.268,36.732,5,29,5z"></path><path fill="#2962ff" d="M36.75,27C34.683,27,33,25.317,33,23.25s1.683-3.75,3.75-3.75s3.75,1.683,3.75,3.75	S38.817,27,36.75,27z M36.75,21c-1.24,0-2.25,1.01-2.25,2.25s1.01,2.25,2.25,2.25S39,24.49,39,23.25S37.99,21,36.75,21z"></path><path fill="#2962ff" d="M31.5,27h-1c-0.276,0-0.5-0.224-0.5-0.5V18h1.5V27z"></path><path fill="#2962ff" d="M27,19.75v0.519c-0.629-0.476-1.403-0.769-2.25-0.769c-2.067,0-3.75,1.683-3.75,3.75	S22.683,27,24.75,27c0.847,0,1.621-0.293,2.25-0.769V26.5c0,0.276,0.224,0.5,0.5,0.5h1v-7.25H27z M24.75,25.5	c-1.24,0-2.25-1.01-2.25-2.25S23.51,21,24.75,21S27,22.01,27,23.25S25.99,25.5,24.75,25.5z"></path><path fill="#2962ff" d="M21.25,18h-8v1.5h5.321L13,26h0.026c-0.163,0.211-0.276,0.463-0.276,0.75V27h7.5	c0.276,0,0.5-0.224,0.5-0.5v-1h-5.321L21,19h-0.026c0.163-0.211,0.276-0.463,0.276-0.75V18z"></path>
</svg>
`,
    link: "https://id.zalo.me/account?continue=https%3A%2F%2Fchat.zalo.me%2F",
    name: "zalo",
  },
];

let index = 0;

function switchContactIcon() {
  index = (index + 1) % contacts.length;
  $("#contactIcon").fadeOut(200, function () {
    $(this).html(contacts[index].icon).fadeIn(200);
  });
  $("#contactBtn").attr("href", contacts[index].link);
}
  // Gán icon đầu tiên ngay khi trang load để khôn bị trống khi vừa load trang
  $("#contactIcon").html(contacts[0].icon);
  $("#contactBtn").attr("href", contacts[0].link);
// Chạy đổi icon mỗi 2 giây
setInterval(switchContactIcon, 2000);
// notification trên 
function updateNotification(count) {
  const badge = document.querySelector('.notification-badge');
  if (count > 0) {
      badge.textContent = count;
      badge.style.display = 'flex';
  } else {
      badge.style.display = 'none';
  }
}

// Ví dụ: Cập nhật số thông báo thành 5 Contact button
updateNotification(1);
//--------------------- Progress scroll-bar
  // Lắng nghe sự kiện cuộn trang
  window.onscroll = function() { updateProgressBar(); };

  function updateProgressBar() {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      let scrolled = (scrollTop / scrollHeight) * 100;

      document.getElementById("progress-bar").style.width = scrolled + "%";
  }


//------------ back-to-top
var btn = $("#bttbutton");

$(window).scroll(function () {
  if ($(window).scrollTop() > 300) {
    btn.addClass("show");
  } else {
    btn.removeClass("show");
  }
});

btn.on("click", function (e) {
  e.preventDefault();
  $("html, body").animate({ scrollTop: 0 }, "300");
});

//----------- cuon den section khi bam vao cac item nav
$(document).ready(function () {
  $(".nav-link").on("click", function (event) {
    event.preventDefault();
    var target = $(this).attr("href");

    $("html, body").animate(
      {
        scrollTop: $(target).offset().top - $(".navbar").outerHeight(),
      },
      800 // Thời gian scroll (800ms)
    );
  });
});
//----------khi nguoi dung bam vao bat ky nut cta nao cung cuon den section form
document.querySelectorAll(".cta-main").forEach(button => {
  button.addEventListener("click", function (event) {
      event.preventDefault(); // Ngăn chặn nhảy ngay lập tức
      const formSection = document.querySelector("#contactForm");
      if (formSection) {
          formSection.scrollIntoView({
              behavior: "smooth",
              block: "start"
          });
          // Hiển thị thông báo Vui lòng điền đầy đủ thông tin sau 1 giây để tránh hiển thị ngay lập tức
          setTimeout(() => {
            Swal.fire({
                icon: "info",
                title: "Vui lòng điền thông tin của bạn!",
                text: "Thông tin của bạn giúp chúng tôi hỗ trợ bạn tốt nhất. Xin cám ơn!",
                confirmButtonText: "OK",
                timer: 3000, // Tự động tắt sau 3 giây
                confirmButtonColor: "#3085d6",
                background: "#FAFBFC",
                color: "#062844",
                width: "30%", // Giảm kích thước xuống 30%
                width: "30%", 
            });
        }, 1000); // Đợi 1 giây sau khi scroll để hiển thị thông báo
      }
  });
});

//----------video
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("videoModal")
    .addEventListener("show.bs.modal", function () {
      document.getElementById("youtubeVideo").src =
        "./images/Ningen Dock Bernard - Tầm soát sức khỏe TOÀN DIỆN - CHI TIẾT - CHUYÊN SÂU - Bernard Healthcare.mp4";
    });

  document
    .getElementById("videoModal")
    .addEventListener("hidden.bs.modal", function () {
      document.getElementById("youtubeVideo").src = "";
    });
});
// di chuyển modal ra ngoài body khi mở
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("videoModal");
  const body = document.body;
  const html = document.documentElement;

  modal.addEventListener("show.bs.modal", function () {
      // Di chuyển modal ra ngoài body
      html.appendChild(modal);
  });

  modal.addEventListener("hidden.bs.modal", function () {
      // Đưa modal trở lại body sau khi đóng
      body.appendChild(modal);
  });
});

// an tat ca phan tu khi modal mo trừ các phần tử bên trong modal (.experia__modal).
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("videoModal"); // Modal video
  const fixedElements = document.querySelectorAll("body *"); // Tất cả phần tử trong body

  function hideFixedElements() {
    fixedElements.forEach(el => {
      if (window.getComputedStyle(el).position === "fixed" && !el.closest(".experia__content__modal")) {
        el.dataset.originalVisibility = el.style.visibility; // Lưu trạng thái cũ
        el.style.visibility = "hidden"; // Ẩn phần tử cố định
      }
    });
  }

  function showFixedElements() {
    fixedElements.forEach(el => {
      if (window.getComputedStyle(el).position === "fixed" && !el.closest(".experia__content__modal")) {
        el.style.visibility = el.dataset.originalVisibility || "visible"; // Khôi phục trạng thái cũ
      }
    });
  }

  // Sự kiện mở modal
  modal.addEventListener("show.bs.modal", hideFixedElements);

  // Sự kiện đóng modal
  modal.addEventListener("hidden.bs.modal", showFixedElements);
});


//đóng backdrop sau che modal
var myModal = new bootstrap.Modal(document.getElementById("videoModal"), {
  backdrop: false,
});

//-----------toogle xem them thu gon

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".see-more").forEach(function (button) {
    button.addEventListener("click", function () {
      const textElement = this.previousElementSibling;
      if (textElement.classList.contains("expanded")) {
        textElement.classList.remove("expanded");
        this.textContent = "Xem thêm";
      } else {
        textElement.classList.add("expanded");
        this.textContent = "Thu gọn";
      }
    });
  });
});
//----------------------
$(document).ready(function () {
  // Lắng nghe sự kiện click trên tất cả các liên kết trong menu
  $(".navbar-nav .nav-link").on("click", function () {
    // Kiểm tra nếu menu đang mở
    if ($(".navbar-collapse").hasClass("show")) {
      // Kích hoạt sự kiện click trên nút hamburger để đóng menu
      $(".navbar-toggler").click();
    }
  });
});
$("#carouselExample").on("slide.bs.carousel", function (event) {
  var $activeItem = $(this).find(".carousel-item.active");
  $activeItem.find(".carousel-item-custom").css("transform", "scale(0.8)"); // Thu nhỏ các item ở ngoài

  // Đảm bảo item ở giữa có hiệu ứng phóng to
  $(event.relatedTarget)
    .find(".carousel-item-custom")
    .css("transform", "scale(1)");
});
