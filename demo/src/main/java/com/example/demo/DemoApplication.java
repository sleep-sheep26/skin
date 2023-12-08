package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {
	var myHeaders = new Headers();
myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");

	var requestOptions = {
			method: 'GET',
	headers: myHeaders,
	redirect: 'follow'
};

fetch("http://127.0.0.1:81/community/user/1", requestOptions)
		.then(response => response.text())
		.then(result => console.log(result))
		.catch(error => console.log('error', error));
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

}
