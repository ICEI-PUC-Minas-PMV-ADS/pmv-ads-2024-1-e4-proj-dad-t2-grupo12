package br.puc.novaapicontroller.util;

import java.util.Arrays;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class LogUtil {

    private static final Logger LOGGER = Logger.getLogger(LogUtil.class.getName());

    public static List<StackTraceElement> getExceptionLine(Exception ex, String className) {
        List<StackTraceElement> filteredErrorlist = Arrays.stream(ex.getStackTrace())
                .filter(elementStackTrace -> {
                    if (elementStackTrace.getFileName() != null) {
                        return elementStackTrace.getFileName().equalsIgnoreCase(className);
                    }
                    return false;
                }).toList();

        return !filteredErrorlist.isEmpty() ? filteredErrorlist : List.of(ex.getStackTrace());
    }

    public static String buscarLinhaExcecaoEImprimirLogErro(Exception ex, String errorMensage, String className) {
        List<StackTraceElement> exceptionLine = LogUtil.getExceptionLine(ex, className);
        if (!exceptionLine.isEmpty()) {
            String error = errorMensage + " -> " + exceptionLine.get(0);
            LOGGER.log(Level.SEVERE, error);
            return exceptionLine.get(0).toString();
        }

        return "";
    }

}
