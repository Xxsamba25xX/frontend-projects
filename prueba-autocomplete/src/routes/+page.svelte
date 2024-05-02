<script lang="ts">
    import Autocomplete from "$lib/autocomplete/autocomplete.svelte";
    let full: any[] = ["asda",2];
    let tuvi: any[] = $state([]);

    function filter(input: string, selected: boolean) {
        if (selected) {
            tuvi = [];
        }

        tuvi = full.filter((item) => {
            return String(item.toString()).includes(input);
        });
    }
</script>

<h1>Welcome to SvelteKit</h1>
<p>
    Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
<div class="ml-2 mr-2">
    <Autocomplete source={tuvi} OnTextChange={filter}></Autocomplete>
</div>

<style>
</style>
