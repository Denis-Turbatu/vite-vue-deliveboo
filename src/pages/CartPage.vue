<script>
export default {};
</script>
<template>
  <div class="container">
    <div class="cart my-4">
      <h1 class="mb-4">Il tuo carrello</h1>
      <div class="row">
        <div class="col-12">
          <div
            class="card mb-4 p-3 d-flex flex-row align-items-center justify-content-between"
          >
            <div class="flex-grow-1 d-flex align-items-center">
              <div class="info me-3">
                <h5 class="card-title">hello</h5>
                <p class="card-text">Prezzo:</p>
                <div class="input-group mb-3 w-50">
                  <input type="number" class="form-control" min="1" />
                </div>
                <p class="card-text">Totale: €</p>
                <button class="btn btn-danger">Rimuovi</button>
              </div>
            </div>
            <img
              src="../assets/img/img_prova.jpg"
              class="card-img-right rounded-circle"
              alt=""
              style="width: auto; max-width: 100px"
            />
          </div>
        </div>
        <div class="col-12 text-end">
          <h3>Totale: €</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
