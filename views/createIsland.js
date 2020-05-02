let stepDodo = () => {
  let formId = "form-dodo-code";
  let inputId = "input-dodo-code";
  let errorId = "error-dodo-code";

  // Dumb validation since we don't have private API access
  let validate = code => {
    // if (code.length != 5) return false;
    let valid = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "p",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m"
    ];

    return code
      .toLowerCase()
      .split("")
      .every(c => valid.indexOf(c) > -1);
  };

  return {
    render: () => {
      return `
        <form id="${formId}">
          <label>
            Enter your Dodo Code:
            <input type="text"
              name="dodoCode"
              id="${inputId}"
              minlength="5"
              maxlength="5"
            />
            <span id="${errorId}"></span>
          </label>
          <button type="submit">
            Submit
          </button>
        </form>
      `;
    },
    setup: () => {
      document.getElementById(inputId).addEventListener("input", e => {
        e.preventDefault();

        document.getElementById(errorId).innerHTML = validate(e.target.value)
          ? ""
          : "Incorrect Dodo Code format. Please try again.";
      });

      document.getElementById(formId).addEventListener("submit", e => {
        e.preventDefault();
        if (validate(e.target.elements["dodoCode"].value)) {
        }
      });
    }
  };
};

let stepIsland = () => {
  let formId = "form-island-info";
  let dialogId = "dialog-island-info";

  return {
    render: () => {
      return `
        <dialog id="${dialogId}" open>
          <form id="${formId}">
            <fieldset>
              <legend>
                Island basics
              </legend>
              <label>
                Island name
                <input type="text"
                  name="islandName">
              </label>
              <select name="fruit" required
                aria-label="Island fruit">
                <option>🍎</option>
                <option>🍒</option>
                <option>🍊</option>
                <option>🍑</option>
                <option>🍐</option>
              </select>
              <select name="hemisphere" required
                aria-label="Island hemisphere">
                <option>North</option>
                <option>South</option>
              </select>
              <fieldset class="form-island-info-stores">
                <legend>
                  Stores
                </legend>
                <label>
                  Nook's Cranny (*required)
                  <input type="checkbox" name="storeNook" required />
                </label>
                <label>
                  Able Sisters
                  <input type="checkbox" name="storeAble" />
                </label>
                <label>
                  Nook's Cranny Upgraded
                  <input type="checkbox" name="storeNookPlus" />
                </label>
              </fieldset>
            </fieldset>
            <fieldset>
              <legend>
                On your island now
              </legend>
              
            </fieldset>
          </form>
        </dialog>
      `;
    },
    setup: () => {}
  };
};

function setState() {}

function render(divId) {
  let step = [stepDodo(), stepIsland()];

  document.getElementById(divId).innerHTML = step.reduce(
    (a, b) => a + b.render(),
    ""
  );
  step.forEach(s => {
    s.setup();
  });
}

export { render };
