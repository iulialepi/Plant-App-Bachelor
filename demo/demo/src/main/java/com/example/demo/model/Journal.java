package com.example.demo.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table //(name = "journal")
public class Journal {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Column
    private String content;

    @Column
    private Date date;

    @ManyToOne
    @JoinTable(name = "user_id")
    private User user;

    public void setUser(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }


    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public User getUser() {
        return user;
    }


}




