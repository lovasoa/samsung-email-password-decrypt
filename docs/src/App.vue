<template>
  <div id="app">
    <img src="./assets/logo.svg">
    <h1>Decode android email passwords</h1>
    <p>
      Samsung encrypts the passwords in <code>EmailProvider.db</code>.
      This tool helps you decode them.
      <a href="https://github.com/lovasoa/samsung-email-password-decrypt">
        More information about the type of encryption.
      </a>
    </p>
    <p>
      <input
        id="encrypted"
        v-model="encrypted"
        placeholder="encoded password"
        autofocus>
    </p>
    <p>
      <label class="error" for="encrypted" v-if="error">
        Unable to decode this password. Make sure it is a valid encoded password
        from the table <code>HostAuth</code> of an <code>EmailProvider.db</code> database.
        <details><summary>Technical details</summary>
          <pre>{{error.toString()}}</pre>
        </details>
      </label>
    </p>
    <p id="result" v-if="decrypted">Decrypted: <pre>{{decrypted}}</pre></p>
  </div>
</template>

<script>
var samsungPassword = require("../samsung-password.js");

export default {
  name: 'app',
  data () {
    return {
      error: null,
      encrypted: 'PZuJKsdIAGG2VSW0yUPcXw=='
    }
  },
  computed: {
    decrypted: function () {
      this.error = null;
      try {
        return samsungPassword.decode(this.encrypted);
      } catch (e) {
        this.error = e;
        return null;
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 600px;
  text-align: justify;
  margin: auto;

}

h1, h2 {
  font-weight: normal;
  text-align: center;
}

input {
  font-family: monospace;
  letter-spacing: 1px;
  width: 100%;
  margin: auto;
  padding: 3px;
  font-size: 17px;
}

#result{
  font-size: 17px;
}
#result > pre {
  display: inline-block;
  border-radius: 4px;
  padding: 2px;
  border: 1px solid #222;
  background-color: #eee;
  font-size: 20px;
}

a {
  color: #42b983;
}
</style>
