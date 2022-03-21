<template>
  <div class="wrapper">
    <h1 class="title">Blocker</h1>
    <div class="buttons">
      <button
        type="button"
        class="state-off"
        @click="setShow"
      >show off button</button>

    </div>
    <div class="buttons">

      <button
        type="button"
        class="state-on"
        @click="setActive(true)"
        :class="{'is-active':active }"
      >ON</button>
      <button
        v-if="show"
        type="button"
        class="state-off"
        :class="{'is-active':!active }"
        @click="setActive(false)"
      >OFF</button>
    </div>

    <div class="sites">
      <p>List of website, one per line.</p>

      <textarea
        v-model="list"
        rows="8"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="off"
      ></textarea>
    </div>
    <button
      type="button"
      class="state-save"
      @click="saveList"
    >Save List</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: true,
      list: "example.com",
      show: false,
    };
  },
  created() {
    chrome.storage.sync.get(
      ["toggleSitesActive", "toggleSitesList"],
      (result) => {
        this.active = result.toggleSitesActive;
        this.list = result.toggleSitesList;
      }
    );
  },
  methods: {
    setShow() {
      setTimeout(() => {
        this.show = true;
      }, 5000);
    },
    setActive(active) {
      this.active = active;
      chrome.storage.sync.set(
        {
          toggleSitesActive: active,
        },
        () => {}
      );
    },
    saveList() {
      chrome.storage.sync.set(
        {
          toggleSitesList: this.list,
        },
        () => {}
      );
    },
  },
};
</script>