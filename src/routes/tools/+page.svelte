<script>
    import { enhance } from '$app/forms';
    export let data; // Szerverről kapott adatok
    let tools = data.tools; // Az összes eszköz
  
    // Kölcsönzés után frissíti az eszközök listáját
    async function refreshTools() {
      const res = await fetch('/my-tools');
      const data = await res.json();
      tools = data.tools;
    }
  </script>
  
  <main>
    <h1>Eszközök</h1>
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
  