<script >
	import { enhance } from '$app/forms';
	
	let { data } = $props();
</script>

<h1>Sikeresesen bejelentkezett</h1>
<p>Bejelentkezve: {data.user.name}</p>
<form method='post' action='?/logout' use:enhance>
	<button class="ui red button">Sign out</button>
</form>
