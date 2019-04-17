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

            // -------------- Actions ---------------

            // Add new Todo
            vm.addNewTodo = content => {
                vm.Todos.push({
                    _id: IDcounter++,
                    content,
                    isCompleted: false
                });
                vm.dialog_cancel();
            };

            // Delete Todo using (_id)
            vm.deleteThisTodo = id => {
                vm.Todos = vm.Todos.filter(todo => todo._id !== id);
            };

            // Check if any completed Todos there or empty
            vm.lengthCompletedTodos = _ =>
                vm.Todos.filter(todo => todo.isCompleted).length;

            // Check if any incompleted Todos there or empty
            vm.lengthInCompletedTodos = _ =>
                vm.Todos.filter(todo => !todo.isCompleted).length;

            // Clear all completed Todos
            vm.clearAllCompleted = ev => {
                var confirm = $mdDialog
                    .confirm()
                    .title("Would you like to delete all Todos?")
                    .ariaLabel("delete all completed")
                    .targetEvent(ev)
                    .ok("Please do it!")
                    .cancel("No!");

                $mdDialog.show(confirm).then(
                    () =>
                        // clear all
                        (vm.Todos = vm.Todos.filter(todo => !todo.isCompleted)),
                    _ => {} // not to clear
                );
            };

            // Show new Todo Dialog
            vm.show_NewTodoDialog = ev => {
                var newTodoDialog = $mdDialog
                    .prompt()
                    .title("What would you like to do?")
                    .placeholder("Todo ...")
                    .ariaLabel("Todo Content")
                    .targetEvent(ev)
                    .required(true)
                    .ok("Okay!")
                    .cancel("Cancel");

                $mdDialog
                    .show(newTodoDialog)
                    .then(result => vm.addNewTodo(result), _ => {});
            };

            // hide new Todo Dialog
            vm.dialog_cancel = () => $mdDialog.cancel();
        }
    ]);
})();
