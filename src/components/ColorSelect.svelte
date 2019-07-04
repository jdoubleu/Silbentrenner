<script>
    const colors = [
        { name: 'Monokai', colors: ['#272822', '#F92672', '#66D9EF', '#A6E22E', '#FD971F'] },
        { name: 'blue-red', colors: ['#0070c0', '#f00'] }
    ];

    export let value = colors[0].colors;
</script>

<div id="color-select">
    <label for="color-select--select">Color scheme: </label>
    <select bind:value id="color-select--select">
        {#each colors as color}
            <option value={color.colors}>{color.name}</option>
        {/each}
    </select>
</div>
