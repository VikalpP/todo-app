(function() {
    "use strict";

    angular.module("appModule").controller("mainCtrl", [
        "$mdDialog",
        function($mdDialog) {
            // --------------- init things --------------------
            let vm = this, // ViewModel
                $body = angular.element(document.body),
                IDcounter = 10;

            vm.Todos = [
                { _id: 1, content: "TODO 1", isCompleted: false },
                { _id: 2, content: "TODO 2", isCompleted: false }
            ];

            vm.show_NewTodoSection_Dialog = ev => {
                vm.form_addTodo.$setPristine();
                $mdDialog.show({
                    multiple: false,
                    contentElement: "#addNewTodo_section",
                    parent: $body,
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    escapeToClose: true,
                    onRemoving: () => {
                        vm.NewTodoContent = "";
                        vm.form_addTodo.$setPristine();
                        console.log("Removed Dialog");
                    }
                });
            };

            // -------------- Actions ---------------

            // vm.markAsCompleteTodo = id => {
            //     vm.Todos = vm.Todos.map(todo =>
            //         todo._id === id ? { ...todo, isCompleted: true } : todo
            //     );
            //     console.log(vm.Todos);
            // };

            vm.addNewTodo = () => {
                vm.Todos.push({
                    _id: IDcounter++,
                    content: vm.NewTodoContent,
                    isCompleted: false
                });
                vm.dialog_cancel();
            };

            vm.deleteThisTodo = id => {
                vm.Todos = vm.Todos.filter(todo => todo._id !== id);
                console.log(vm.Todos);
            };

            vm.getNewTodoDialog = ev => {
                vm.show_NewTodoSection_Dialog(ev);
            };

            vm.dialog_cancel = () => {
                $mdDialog.cancel();
            };

            vm.isCompletedTodosEmpty = () =>
                vm.Todos.filter(todo => todo.isCompleted).length == 0;

            vm.isInCompletedTodosEmpty = () =>
                vm.Todos.filter(todo => !todo.isCompleted).length == 0;
        }
    ]);
})();
