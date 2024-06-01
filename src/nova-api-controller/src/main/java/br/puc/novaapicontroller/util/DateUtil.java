package br.puc.novaapicontroller.util;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;

public class DateUtil {

    public static String formatarDataISO(String dataEntrada) {
        OffsetDateTime offsetDateTime = OffsetDateTime.parse(dataEntrada, DateTimeFormatter.ISO_OFFSET_DATE_TIME);
        return offsetDateTime.format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);
    }

    public static LocalDateTime stringToLocalDteTime(String data, String formato) {
        if (data.contains("Z") && !formato.contains("Z")) {
            data = data.replace("Z", "");
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(formato);
        return LocalDateTime.parse(data, formatter);
    }

}
