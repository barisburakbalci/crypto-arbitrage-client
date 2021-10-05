<template>
  <div v-if="targetCompanies">
    <table
      v-for="(company, companyIndex) in targetCompanies"
      :key="`targetCompany${companyIndex}`"
    >
      <tr
        v-for="(pair, pairIndex) in company.pairs"
        :key="`targetCompany${pairIndex}`"
      >
        <td>{{ pair.symbol }}</td>
        <td>{{ pair.price }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  beforeCreate() {
    this.$store.dispatch("getPriceLists");
  },
  computed: {
    //sourceCompany: () => this.$store.state.sourceCompany,
    targetCompanies() {
      return this.$store.state.targetCompanies;
    },
  },
};
</script>
