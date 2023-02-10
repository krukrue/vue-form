<template>
  <div class="wrapper">
    <main class="form">
      <h1>Formulář</h1>
      <InputForm
        v-for="(option, index) of options"
        :key="option"
        :placehold="option"
        :vmodel="index"
        @changeInput="changeInput"
      ></InputForm>

      <section class="product-select">
        <InputForm
          :vmodel="5"
          :placehold="'Enter product name'"
          @changeInput="changeInput"
        ></InputForm>

        <label class="input-form" for="text"
          ><input
            v-model="inputs[6]"
            type="text"
            maxlength="5"
            @keypress="isNumber($event)"
            @paste="isNumber($event)"
        /></label>
      </section>
      <footer>
        <div class="price">
          Počet kusů:
          <span class="price-changer" @click="changePrice(false)">-</span>
          <label class="input-form" for="text"
            ><input
              v-model.lazy="prodNumber"
              type="text"
              @keypress="isNumber($event)"
              @paste="isNumber($event)"
              maxlength="3"
          /></label>
          <span class="price-changer" @click="changePrice(true)">+</span>
          Konečná cena: {{ changeRate }}
        </div>
        <Select @selectChange="(change) => (selectedRate = change)"></Select>
      </footer>
      <button class="send-btn" @click="send">Poslat žádost</button>
    </main>
  </div>
</template>

<script>
import InputForm from "./components/InputForm.vue";
import { isNumber } from "./functions/IsNumber.js";
import Select from "./components/Select.vue";

export default {
  components: {
    InputForm,
    Select
  },
  data() {
    return {
      options: ["First Name", "Last Name", "Address", "Birth Date (MM.DD.YYYY)", "Email"],
      inputs: [null, null, null, null, null, null, null],
      prodNumber: 1,
      rates: [0, 0, 0],
      selectedRate: 0
    };
  },
  computed: {
    changeRate(){
      if (this.selectedRate == 0) return (this.prodNumber * this.inputs[6] * 1.21).toFixed(2)
      return ((this.prodNumber * this.inputs[6] * this.rates[this.selectedRate - 1]) * 1.21).toFixed(2)
    }
  },
  methods: {
    isNumber: isNumber,

    changeInput(arg1, arg2) {
      this.inputs[arg1] = arg2;
    },
    changePrice(bool) {
      if (!bool && this.prodNumber <= 0) return;
      bool ? this.prodNumber++ : this.prodNumber--;
    },
    send(){
      console.log(this.inputs.includes(null))
      console.log(!this.dateCheck(this.inputs[3]));
      console.log(this.prodNumber == 0)
      console.log(!this.emailCheck(this.inputs[4]))
      if (this.inputs.includes(null) || !this.dateCheck(this.inputs[3]) || this.prodNumber == 0  || !this.emailCheck(this.inputs[4])) {
        alert('Incorrect input in input field')
      }



      console.log(this.inputs, this.prodNumber, this.selectedRate);
    },
    dateCheck(date){
      if (!Date.parse(date)) return false;
      return true;
    },
    emailCheck(email){
      if (!email.includes('@') || !email.includes('.')) return false;
      return true;
    }

  },
  created() {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "Pa586XM455xzN1v1EU4y5T0kMi5X6EnQ");

    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };

    fetch(
      "https://api.apilayer.com/exchangerates_data/latest?symbols=GBP%2CEUR%2CUSD&base=CZK",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.rates[0] = result.rates['USD'];
        this.rates[1] = result.rates['EUR'];
        this.rates[2] = result.rates['GBP'];
      })

      .catch((error) => console.log("error", error));
  },
};
</script>

<style lang="scss" src="./style.scss"></style>
