<script>
import simpleBar from 'simplebar-vue';
import "simplebar-vue/dist/simplebar.min.css";

export default {
  components:{
    simpleBar
  },
  methods: {
    showAlert(){
      this.$swal("Vinculado com sucesso!", "success");
    }
  }
};
</script>
