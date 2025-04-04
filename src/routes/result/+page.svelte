<script>
    import { enhance } from '$app/forms';
    import { page } from '$app/stores';
    export let data;
    
    // Reaktív deklaráció a tools-ra, ami frissül amikor változik a data
    $: tools = data.tools;
    
    // Amikor változik az URL, újratöltjük az oldalt
    $: if ($page.url.searchParams.get('search')) {
        // Az oldal automatikusan újratöltődik a SvelteKit által
        // amikor az URL változik, így nem kell külön kezelni
    }
</script>

<main>
    <h1>Találatok</h1>
    <table class="ui fixed table">
      <thead>
        <tr>
          <th>Eszköz neve</th>
          <th>Tulajdonos</th>
          <th>Leírás</th>
          <th>Kölcsönzés</th>
        </tr>
      </thead>
      <tbody>
        {#each tools as tool}
          <tr>
            <td>{tool.title}</td>
            <td>{tool.user_name ? tool.user_name : 'Nincs kölcsönözve'}</td>
            <td>{tool.description}</td>
            <td>
              <form method="post" action="?/rent" use:enhance>
                <input type="hidden" name="tool_id" value={tool.id} />
                <button class="ui green button" type="submit">Kölcsönzés</button>
              </form>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
</main>
  