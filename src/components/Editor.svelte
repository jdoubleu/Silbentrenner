<script>
    export let value = '';
</script>

<style>
    #editor {
        background-color: #f6f6f6;
        border: 0;
        resize: none;
        outline: none;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        margin: 0;
        font-size: inherit;
    }
</style>

<textarea bind:value id="editor" placeholder="Eingabe"></textarea>
