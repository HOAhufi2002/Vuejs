<template>
  <div id="app" class="cart-container">
    <section>
      <div class="yourCart top-content">
        <a href="http://localhost:8081/products" class="buymore">Tiếp tục mua hàng</a>
        <span>Giỏ hàng của bạn</span>
      </div>
      <div class="middleCart">
        <ul class="listing-cart">
          <li v-for="item in cartStore.items" :key="item.name" class="product-item">
            <div class="imgsp">
              <a :href="item.url" target="_blank">
                <img :src="item.image" :alt="item.name" loading="lazy" class="product-image" />
              </a>
              <div>
                <button
                  style="color: red; background: none; border: none; cursor: pointer"
                  @click="removeFromCart(item.name)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 448 512"
                    fill="currentColor"
                  >
                    <path
                      d="M135.2 17.6c3.7-9.6 12.9-16.6 23.2-17.6h121.1c10.4 0.9 19.5 8 23.2 17.6l7.9 17.6H400c13.3 0 24 10.7 24 24s-10.7 24-24 24h-16v352c0 35.3-28.7 64-64 64H128c-35.3 0-64-28.7-64-64V83.2H48c-13.3 0-24-10.7-24-24s10.7-24 24-24h54.9l7.9-17.6zm0 78.4v352c0 8.8 7.2 16 16 16h192c8.8 0 16-7.2 16-16V96H135.2zm152 64c0-13.3-10.7-24-24-24s-24 10.7-24 24v256c0 13.3 10.7 24 24 24s24-10.7 24-24V160zm-96 0c0-13.3-10.7-24-24-24s-24 10.7-24 24v256c0 13.3 10.7 24 24 24s24-10.7 24-24V160z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div class="infosp">
              <div class="name-price">
                <div class="name-container">
                  <a :href="item.url" class="product-item__name">{{ item.name }}</a>
                </div>
                <div class="price-area">
                  <span>{{
                    item.price.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })
                  }}</span>
                </div>
              </div>
              <hr style="width: 65%; visibility: hidden" />
              <div class="promo">
                <aside>
                  <small class="promotionName">Tặng gói Bảo hành mở rộng 6 tháng</small>
                  <small class="promotionName">Cơ hội trúng xe máy Yamaha mỗi tháng</small>
                  <small class="promotionName">Giảm ngay 1% khi thanh toán qua VNPAY-QR</small>
                  <label>3 Khuyến mãi</label>
                </aside>
              </div>
            </div>
          </li>
        </ul>
        <div class="total-provisional">
          <span class="total-product-quantity"
            >Tạm tính ({{ cartStore.cartCount }} sản phẩm):
          </span>
          <span class="temp-total-money">{{
            totalAmount.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })
          }}</span>
        </div>

        <div v-if="cartStore.cartCount > 0" class="infor-customer">
          <h4>Thông tin khách hàng</h4>
          <form @submit.prevent="buy" class="form-customer">
            <div class="customer-info">
              <div class="gender-selection">
                <label>
                  <input type="radio" name="gender" value="Anh" v-model="customerGender" />
                  Anh
                </label>
                <label>
                  <input type="radio" name="gender" value="Chị" v-model="customerGender" />
                  Chị
                </label>
              </div>
              <div class="form-row">
                <input
                  v-model="customerName"
                  type="text"
                  id="cusName"
                  required
                  placeholder="Họ và Tên"
                />
                <input
                  v-model="customerPhone"
                  type="tel"
                  id="cusPhone"
                  required
                  placeholder="Số điện thoại"
                />
              </div>
              <h4>Chọn cách thức nhận hàng</h4>
              <div class="delivery-method">
                <label>
                  <input
                    type="radio"
                    name="delivery"
                    value="Giao tận nơi"
                    v-model="deliveryMethod"
                  />
                  Giao tận nơi
                </label>
                <label>
                  <input
                    type="radio"
                    name="delivery"
                    value="Nhận tại siêu thị"
                    v-model="deliveryMethod"
                  />
                  Nhận tại siêu thị
                </label>
              </div>
              <div class="form-row">
                <input
                  v-model="customerAddress"
                  type="text"
                  id="cusAddr"
                  required
                  placeholder="Nhập địa chỉ của bạn"
                />
              </div>
              <div class="additional-requests">
                <label><input type="checkbox" /> Gọi người khác nhận hàng (nếu có)</label>
                <label><input type="checkbox" /> Chuyển danh bạ, dữ liệu qua máy mới</label>
                <label><input type="checkbox" /> Xuất hóa đơn công ty</label>
              </div>
            </div>
            <button type="submit" class="submitorder">Đặt hàng</button>
          </form>
          <div v-if="showSuccessMessage" class="success-message">
            <p>Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { cartStore } from '../cartStore';

export default {
  name: 'CartView',
  setup() {
    const customerName = ref('');
    const customerPhone = ref('');
    const customerAddress = ref('');
    const customerGender = ref('');
    const deliveryMethod = ref('');
    const showCustomerForm = ref(false);
    const showSuccessMessage = ref(false);

    const totalAmount = computed(() => {
      return cartStore.items.reduce((total, item) => total + item.price * item.quantity, 0);
    });

    const removeFromCart = (name) => {
      const index = cartStore.items.findIndex((item) => item.name === name);
      if (index !== -1) {
        cartStore.items.splice(index, 1);
      }
    };

    const buy = () => {
      console.log('Customer Name:', customerName.value);
      console.log('Customer Phone:', customerPhone.value);
      console.log('Customer Address:', customerAddress.value);
      console.log('Total Amount:', totalAmount.value);

      cartStore.items = [];
      customerName.value = '';
      customerPhone.value = '';
      customerAddress.value = '';
      customerGender.value = '';
      deliveryMethod.value = '';
      showCustomerForm.value = false;
      showSuccessMessage.value = true;
    };

    return {
      cartStore,
      customerName,
      customerPhone,
      customerAddress,
      customerGender,
      deliveryMethod,
      totalAmount,
      removeFromCart,
      buy,
      showCustomerForm,
      showSuccessMessage,
    };
  },
};
</script>
<style scoped>
.cart-container {
  width: 40%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-height: 80vh; /* Set a maximum height */
  overflow-y: auto; /* Make the container scrollable */
}

.top-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
}

.buymore {
  text-decoration: none;
  color: #007bff;
  transition: color 0.3s;
}

.buymore:hover {
  color: #0056b3;
}

.middleCart {
  margin-top: 20px;
}

.listing-cart {
  list-style: none;
  padding: 0;
  margin: 0;
}

.product-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.imgsp {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.imgsp img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.infosp {
  flex: 1;
  padding-left: 20px;
}

.name-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.promo {
  margin-top: 10px;
}

.promo small {
  display: block;
}

.total-provisional {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-top: 1px solid #ddd;
  font-weight: bold;
}

.infor-customer {
  margin-top: 20px;
}

.customer-info {
  display: flex;
  flex-direction: column;
}

.gender-selection {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.gender-selection label {
  margin-right: 10px;
}

.delivery-method {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.delivery-method label {
  margin-right: 10px;
}

.form-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.form-row input {
  width: 48%; /* Adjusted width to make space for the margin */
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

#cusPhone {
  margin-left: 10px; /* Specific left margin for the phone input */
}

.additional-requests {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.additional-requests label {
  margin-bottom: 5px;
}

.submitorder {
  margin-top: 20px;
  padding: 10px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submitorder:hover {
  background-color: #218838;
}

.success-message {
  margin-top: 20px;
  padding: 10px;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 5px;
  color: #155724;
}
</style>
