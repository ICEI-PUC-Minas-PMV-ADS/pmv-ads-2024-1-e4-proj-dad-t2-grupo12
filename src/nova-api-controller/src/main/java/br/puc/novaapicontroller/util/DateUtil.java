package br.puc.novaapicontroller.util;

import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;

public class DateUtil {

    public static String formatarDataISO(String dataEntrada) {
        OffsetDateTime offsetDateTime = OffsetDateTime.parse(dataEntrada, DateTimeFormatter.ISO_OFFSET_DATE_TIME);
        return offsetDateTime.format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);
    }

}
