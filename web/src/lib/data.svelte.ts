interface IActivePage {
	title: string;
}
export let activePage = $state({
	title: '',
	setPage(val: IActivePage) {
		this.title = val.title;
	}
});
