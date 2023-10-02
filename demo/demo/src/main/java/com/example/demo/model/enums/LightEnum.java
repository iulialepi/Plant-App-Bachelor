package com.example.demo.model.enums;

public enum LightEnum {
    BRIGHT("Bright"),
    INDIRECT("Indirect"),
    LOW("Low");

    public final String label;

    private LightEnum(String label) {
        this.label = label;
    }
}
