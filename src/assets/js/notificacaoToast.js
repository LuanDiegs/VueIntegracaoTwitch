export function notificacaoToast(mensagem, tipoNotificacao) {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timerProgressBar: true,
        background: "#643cc3",
        color: "#f8f6fc",
        width: 370,
        timer: 3000,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: tipoNotificacao,
        title: mensagem
      });
}