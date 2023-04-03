package com.fridge.util;
import java.lang.reflect.InvocationTargetException;

/**
 * Class with static method for incremental update on given object with new parameters and members
 */
public class UpdateReflection {

    /**
     * Function for incremental update
     *
     * @param updateObject    Object with members providing data used for updating
     * @param persistedObject Object providing persisted data
     */
    public static void Update(Object updateObject, Object persistedObject) {
        if (updateObject != null && persistedObject != null)
            for (var member : updateObject.getClass().getDeclaredFields())
                try {
                    // get member name
                    var name = member.getName();
                    name = name.substring(0, 1).toUpperCase() + name.substring(1);

                    // get member field functions (get/set)
                    var method = updateObject.getClass().getDeclaredMethod("get" + name);
                    var methodSet = persistedObject.getClass().getDeclaredMethod("set" + name, member.getType());

                    // update non-null values in persisted object
                    var updateValue = method.invoke(updateObject);
                    if (updateValue != null)
                        methodSet.invoke(persistedObject, method.invoke(updateObject));

                } catch (IllegalAccessException | NoSuchMethodException | InvocationTargetException e) {
                    e.printStackTrace();
                }
    }
}
