let data = [
	{
		index: 0,
		text: "[84] - Услуги в области государственного управления и обороны, предоставляемые обществу в целом; услуги по обязательному социальному страхованию",
		selected: false,
	},
	{
		index: 1,
		text: "[84.1] - Услуги в области государственного управления общего характера и социально-экономической сфере",
		selected: false,
	},
	{
		index: 1.1,
		text: "[84.11] - Услуги в области государственного управления общего характера",
		selected: false,
	},
	{
		index: 1.2,
		text: "[84.12] - Услуги по государственному регулированию деятельности учреждений здравоохранения, образования, культуры и прочие социальные услуги (кроме социального обеспечения)",
		selected: false,
	},
	{
		index: 1.3,
		text: "[84.13] - Услуги по государственному регулированию и содействию эффективному ведению экономической деятельности",
		selected: false,
	},
	{
		index: 2,
		text: "[84.2] - Услуги, предоставляемые государством обществу в целом",
		selected: false,
	},
	{
		index: 2.1,
		text: "[84.21] - Услуги в области международных отношений ",
		selected: false,
	},
	{
		index: 2.2,
		text: "[84.22] - Услуги, предоставляемые государством обществу в целом в области обороны",
		selected: true,
	},
	{
		index: 2.3,
		text: "[84.23] - Услуги в области юстиции и правосудия",
		selected: false,
	},
	{
		index: 2.4,
		text: "[84.24] - Услуги по обеспечению общественной безопасности и правопорядка",
		selected: true,
	},
	{
		index: 2.5,
		text: "[84.25] - Услуги по обеспечению безопасности в чрезвычайных ситуациях",
		selected: false,
	},
	{
		index: 3,
		text: "[84.3] - Услуги в области обязательного социального страхования",
		selected: true,
	},
];
let defaultDataChecked = [];

const mainWrapper = document.querySelector(".wrapper");
const optionHandler = document.querySelector("#option-handler");
const modal = document.querySelector(".modal");
const mainSpan = document.querySelector(".main-span");
const mainParagraphSpan = document.querySelector(".main-paragraph-span");
const formSelect = document.querySelector("#form-select");
const mainDiv = document.querySelector(".main");

optionHandler.addEventListener("click", () => {
	modal.style.display = "flex";
	mainWrapper.style.display = "none";

	modal.innerHTML = "";

	modal.innerHTML += `
    <div class="modal-wrapper">
        <div class="modal-header-wrapper">
            <div class="modal-header">
                <button class="modal-header-btn"></button>
                <p>Реализуемые товары</p>
                <span class="modal-span"></span>
            </div>
            <input class="modal-header-input" />
        </div>
        <div class="modal-main-wrapper">
            <select name="tnved" id="modal-select" multiple></select>
        </div>
        <div class="modal-footer-wrapper">
            <div class="modal-footer-btn">
             <button class="modal-footer-btn-ok">Применить</button>
             <button class="modal-footer-btn-clear">Очистить</button>
            </div>
        </div>
    </div>
    `;

	const modalSelect = document.querySelector("#modal-select");
	const modalSpan = document.querySelector(".modal-span");
	const closeModalBtn = document.querySelector(".modal-header-btn");
	const modalFooterBtnOk = document.querySelector(".modal-footer-btn-ok");
	const modalFooterBtnClear = document.querySelector(".modal-footer-btn-clear");
	const modalHeaderInput = document.querySelector(".modal-header-input");

	addOptions(
		modalSelect,
		modalSpan,
		modalFooterBtnOk,
		modalFooterBtnClear,
		modalHeaderInput
	);
	closeModal(closeModalBtn);
	multipleSelection(modalSelect);
	addHeaderSpanOnClickModalSelect(modalSelect, modalSpan);
});

const addOptions = (
	modalSelect,
	modalSpan,
	modalFooterBtnOk,
	modalFooterBtnClear,
	modalHeaderInput
) => {
	data.forEach((element) => {
		modalSelect.innerHTML += `
		<option value="${element.index}" class="modal-option"  >
			${element.text}
		</option>
		`;
	});

	const modalOption = document.querySelectorAll(".modal-option");

	defaultOptions(modalOption, modalSpan);
	addCheckedOptions(modalOption);
	handleBtnOk(modalFooterBtnOk, modalSelect);
	clearCheckedOptions(modalFooterBtnClear, modalOption, modalSpan);
	filterOptions(modalHeaderInput, modalOption);
};

const defaultOptions = (modalOption, modalSpan) => {
	defaultDataChecked = data.filter((element) => {
		return element.selected === true;
	});

	defaultDataChecked.forEach((item) => {
		for (let option of modalOption) {
			if (Number(option.value) === item.index) {
				option.selected = item.selected;
			}
		}
	});

	addHeaderSpan(modalSpan);
};

const closeModal = (closeModalBtn) => {
	closeModalBtn.addEventListener("click", (event) => {
		event.preventDefault();
		modal.style.display = "none";
		mainWrapper.style.display = "flex";
		if (defaultDataChecked.length === 0) {
			clearCheckedOptions();
		}
	});
};

const multipleSelection = (modalSelect) => {
	modalSelect.onmousedown = (event) => {
		event.preventDefault();

		let scroll_offset = event.target.parentElement.scrollTop;
		event.target.selected = !event.target.selected;
		event.target.parentElement.scrollTop = scroll_offset;
	};
	modalSelect.onmouseup = (event) => {
		event.preventDefault();
	};
	modalSelect.onmousemove = (event) => {
		event.preventDefault();
	};
};

const addHeaderSpan = (modalSpan) => {
	if ((modalSpan.style.display = "none")) {
		modalSpan.style.display = "flex";
		modalSpan.textContent = `Выбранное (${defaultDataChecked.length})`;
		if (defaultDataChecked.length === 0) {
			modalSpan.style.display = "none";
		}
	}
	if (defaultDataChecked.length === 0) {
		modalSpan.style.display = "none";
	}
};

const addHeaderSpanOnClickModalSelect = (modalSelect, modalSpan) => {
	modalSelect.addEventListener("click", () => {
		addHeaderSpan(modalSpan);
	});
};

const addCheckedOptions = (modalOption) => {
	for (option of modalOption) {
		option.addEventListener("click", (event) => {
			const index = defaultDataChecked.findIndex((item) => {
				item.index === Number(event.target.value);
			});

			if (event.target.selected === true) {
				defaultDataChecked.push({
					index: Number(event.target.value),
					text: event.target.text,
					selected: event.target.selected,
				});
			} else {
				defaultDataChecked.splice(index, 1);
			}
		});
	}
};

const changeMainUiOnHandleBtnOk = (modalSelect) => {
	let checkedModalSelect = modalSelect.cloneNode(true);
	checkedModalSelect.id = "checked-modal-select";
	checkedModalSelect.multiple = false;
	checkedModalSelect.size = 1;
	mainParagraphSpan.textContent = "Заказчика";
	mainSpan.style.display = "flex";
	mainSpan.textContent = `Показать выбранное (${defaultDataChecked.length})`;
	mainDiv.innerHTML = "";
	mainDiv.appendChild(checkedModalSelect);

	preventDefaultCheckedModalSelect(checkedModalSelect);
	showSelectedOptions(mainSpan, checkedModalSelect);
};

const preventDefaultCheckedModalSelect = (checkedModalSelect) => {
	checkedModalSelect.onmousedown = (event) => {
		event.preventDefault();
	};
	checkedModalSelect.onmousemove = (event) => {
		event.preventDefault();
	};
	checkedModalSelect.onmouseup = (event) => {
		event.preventDefault();
	};
};

const handleBtnOk = (modalFooterBtnOk, modalSelect) => {
	modalFooterBtnOk.addEventListener("click", () => {
		modal.style.display = "none";
		mainWrapper.style.display = "flex";

		if (defaultDataChecked.length != 0 && defaultDataChecked.length > 0) {
			changeMainUiOnHandleBtnOk(modalSelect);
		} else {
			mainParagraphSpan.textContent = "Поставщика";
			mainSpan.style.display = "none";
			mainDiv.innerHTML = "";
			mainDiv.appendChild(formSelect);
		}
	});
};

const showSelectedOptions = (...handler) => {
	handler.forEach((item) => {
		item.addEventListener("click", () => {
			modal.style.display = "flex";
			mainWrapper.style.display = "none";
		});
	});
};

const clearCheckedOptions = (modalFooterBtnClear, modalOption, modalSpan) => {
	modalFooterBtnClear.addEventListener("click", (event) => {
		event.preventDefault();

		defaultDataChecked.splice(0, defaultDataChecked.length);

		addHeaderSpan(modalSpan);

		for (let option of modalOption) {
			option.selected = false;
		}
	});
};

const filterOptions = (modalHeaderInput, modalOption) => {
	modalHeaderInput.oninput = () => {
		let valueText = modalHeaderInput.value.toLowerCase().trim();

		console.log(valueText);

		if (valueText != "") {
			modalOption.forEach((item) => {
				// console.log(item.text.toLowerCase().search(valueText) == -1);
				if (item.text.toLowerCase().search(valueText) == -1) {
					item.classList.remove("filter-text");
					item.innerHTML = item.innerText;
				} else {
					item.classList.add("filter-text");
					let str = item.innerText;
					let pos = item.text.toLowerCase().search(valueText);
					let leng = valueText.length;
					item.innerHTML = markWord(str, pos, leng);
				}
			});
		} else {
			modalOption.forEach((item) => {
				item.classList.remove("filter-text");
				item.innerHTML = item.innerText;
			});
		}
	};
};

const markWord = (string, pos, leng) => {
	return (
		string.slice(0, pos) +
		`<mark class="mark">` +
		string.slice(pos, pos + leng) +
		`</mark>` +
		string.slice(pos + leng)
	);
};
