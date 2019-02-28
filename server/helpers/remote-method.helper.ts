export const disableAllRemoteMethods = (Model: any, methodsToExpose: string[] = []) => {
  if(Model && Model.sharedClass) {
    const methods = Model.sharedClass.methods();
    const relationMethods: any[]= [];
    const hiddenMethods: any[] = [];

    const methodNames = [
      'findById',
      'destroyById',
      'updateById',
      'exists',
      'link',
      'get',
      'create',
      'update',
      'destroy',
      'unlink',
      'count',
      'delete'
    ];

    Object.keys(Model.definition.settings.relations).forEach(function(relation) {
      methodNames.forEach(methodName => {
        relationMethods.push({ name: methodName + relation, isStatic: false });
      });
    });

    methods.concat(relationMethods).forEach(function(method: any) {
      const methodName = method.name;
      if(methodsToExpose.indexOf(methodName) < 0) {
        hiddenMethods.push(methodName);
        Model.disableRemoteMethodByName(methodName, method.isStatic);
      }
    });

    if (methodsToExpose.indexOf('updateAttributes') < 0) {
      hiddenMethods.push('prototype.updateAttributes');
      Model.disableRemoteMethodByName('prototype.updateAttributes', false);
    }
  }
};
