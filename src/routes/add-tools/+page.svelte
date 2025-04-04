<script>
  import { enhance } from '$app/forms';

  export let data; // A `load` függvényből kapott adatok

  let title = '';
  let description = '';
  let serialnum = '';
  let user_id = data.user?.id ?? ''; // Beállítja az user_id-t
</script>

<main>
  <h1>Eszköz hozzáadása</h1>
  <form method='post' use:enhance>
      <div class="ui form">
          <div class="field">
              <label class="ui label">Eszköz neve</label>
              <input type="text" bind:value={title} name="title" required />
          </div>
          <div class="ui divider"></div>
          <div class="field">
              <label class="ui label">Leírás</label>
              <textarea bind:value={description} name="description" required></textarea>
          </div>
          <div class="ui divider"></div>
          <div class="ui divider"></div>
          <div class="field">
              <label class="ui label">Sorozatszám</label>
              <input type="text" bind:value={serialnum} name="serialnum" required />
          </div>
          <input type="hidden" name="user_id" value={user_id} />
          <div class="ui divider"></div>
      </div>
      <button class="ui green button" type="submit">Eszköz hozzáadása</button>
  </form>
</main>
