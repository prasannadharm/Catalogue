<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="home.aspx.cs" Inherits="Catalog.Pages.home" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Jewellery Catalog</title>	
    <link href="../css/bootstrap.min.css" rel="stylesheet" />
    <link href="../css/baguetteBox.min.css" rel="stylesheet" />
    <link href="../css/cards-gallery.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
	<div class="container">
	<nav class="navbar navbar-inverse my-3 rounded shadow-sm" style="background-color: #692b2b;">
		<a class="navbar-brand mb-0 h1" href="#" style="color: #ffd500;">Jewellery Catalog</a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls=".navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>

		<ul class="nav navbar-nav navbar-right">
			<li style="align-content: center">
				<a href="../Pages/UserLogin.aspx" style="color: #fdf8bc;font-style:italic;">Login to Admin Module</a>                      
			</li>
		</ul>

     </nav>
			
    <section class="gallery-block cards-gallery">
	           
	        <div class="row">
	            <div class="col-6 col-md-4 col-lg-3">
	                <div class="card border-0 transform-on-hover">
	                	<a class="lightbox" href="../images/static/image1.jpg">
	                		<img src="../images/static/image1.jpg" alt="Card Image" class="card-img-top">
	                	</a>
	                    <div class="card-body">
	                        <h6><a href="#">Earrings</a></h6>
	                        <p class="text-muted card-text">Gross 10 Gm, Net 8 Gm, Stone 2 GM,</br> Wasttage : 5% VA, Amount Rs.50,000.00</p>
	                    </div>
	                </div>
	            </div>
	            <div class="col-6 col-md-4 col-lg-3">
	                <div class="card border-0 transform-on-hover">
						<a class="lightbox" href="../images/static/image2.jpg">
		                	<img src="../images/static/image2.jpg" alt="Card Image" class="card-img-top">
		                </a>
	                    <div class="card-body">
	                        <h6><a href="#">Neklace</a></h6>
	                        <p class="text-muted card-text">Gross 30 Gm, Net 25 Gm, Stone 3 GM,</br> Wasttage : 5% VA, Amount Rs.150,000.00</p>
	                    </div>
	                </div>
	            </div>
	            <div class="col-6 col-md-4 col-lg-3">
	                <div class="card border-0 transform-on-hover">
	                	<a class="lightbox" href="../images/static/image3.jpg">
	                		<img src="../images/static/image3.jpg" alt="Card Image" class="card-img-top">
	                	</a>
	                    <div class="card-body">
	                        <h6><a href="#">Neklace with Earings</a></h6>
	                        <p class="text-muted card-text">Gross 30 Gm, Net 25 Gm, Stone 3 GM,</br> Wasttage : 5% VA, Amount Rs.150,000.00</p>
	                    </div>
	                </div>
	            </div>
	            <div class="col-6 col-md-4 col-lg-3">
	                <div class="card border-0 transform-on-hover">
	                	<a class="lightbox" href="../images/static/image4.jpg">
	                		<img src="../images/static/image4.jpg" alt="Card Image" class="card-img-top">
	                	</a>
	                    <div class="card-body">
	                        <h6><a href="#">Antique Neklace with Earings</a></h6>
	                        <p class="text-muted card-text">Gross 30 Gm, Net 25 Gm, Stone 3 GM,</br> Wasttage : 5% VA, Amount Rs.150,000.00</p>
	                    </div>
	                </div>
	            </div>
	            <div class="col-6 col-md-4 col-lg-3">
	                <div class="card border-0 transform-on-hover">
	                	<a class="lightbox" href="../images/static/image5.jpg">
	                		<img src="../images/static/image5.jpg" alt="Card Image" class="card-img-top">
	                	</a>
	                    <div class="card-body">
	                        <h6><a href="#">Nakshatra Earrings</a></h6>
	                        <p class="text-muted card-text">Gross 10 Gm, Net 8 Gm, Stone 2 GM,</br> Wasttage : 5% VA, Amount Rs.50,000.00</p>
	                    </div>
	                </div>
	            </div>
	            <div class="col-6 col-md-4 col-lg-3">
	                <div class="card border-0 transform-on-hover">
	                	<a class="lightbox" href="../images/static/image6.jpg">
	                		<img src="../images/static/image6.jpg" alt="Card Image" class="card-img-top">
	                	</a>
	                    <div class="card-body">
	                        <h6><a href="#">Nakshatra Rings</a></h6>
	                        <p class="text-muted card-text">Gross 10 Gm, Net 8 Gm, Stone 2 GM,</br> Wasttage : 5% VA, Amount Rs.50,000.00</p>							
	                    </div>
	                </div>
	            </div>
				
				<div class="col-6 col-md-4 col-lg-3">
	                <div class="card border-0 transform-on-hover">
	                	<a class="lightbox" href="../images/static/image7.jpg">
	                		<img src="../images/static/image7.jpg" alt="Card Image" class="card-img-top">
	                	</a>
	                    <div class="card-body">
	                        <h6><a href="#">Antique Neklace</a></h6>
	                        <p class="text-muted card-text">Gross 130 Gm, Net 115 Gm, Stone 10 GM,</br> Wasttage : 15% VA, Amount Rs.400,000.00</p>
	                    </div>
	                </div>
	            </div>
	            <div class="col-6 col-md-4 col-lg-3">
	                <div class="card border-0 transform-on-hover">
	                	<a class="lightbox" href="../images/static/image8.jpg">
	                		<img src="../images/static/image8.jpg" alt="Card Image" class="card-img-top">
	                	</a>
	                    <div class="card-body">
	                        <h6><a href="#">Antique Diamond Neklace</a></h6>
	                        <p class="text-muted card-text">Gross 130 Gm, Net 100 Gm, Stone 20 GM,</br> Wasttage : 15% VA, Amount Rs.450,000.00</p>
	                    </div>
	                </div>
	            </div>
	            <div class="col-6 col-md-4 col-lg-3">
	                <div class="card border-0 transform-on-hover">
	                	<a class="lightbox" href="../images/static/image9.jpg">
	                		<img src="../images/static/image9.jpg" alt="Card Image" class="card-img-top">
	                	</a>
	                    <div class="card-body">
	                        <h6><a href="#">Bangles</a></h6>
	                        <p class="text-muted card-text">Gross 10 Gm, Net 8 Gm, Stone 0 GM,</br> Wasttage : 5% VA, Amount Rs.50,000.00<</p>							
	                    </div>
	                </div>
	            </div>
	        </div>
	    
    </section>
	
	<div class="d-flex align-items-center p-3 my-3 rounded shadow-sm" style="background-color: #692b2b;color: #ffd500;">
                © Copyright 2019 Jewellery Catalog. All Rights Reserved.             
	</div>
	</div>
    </form>
    <script src="../scripts/baguetteBox.min.js"></script>    
    <script>
        baguetteBox.run('.cards-gallery', { animation: 'slideIn'});
    </script>
</body>
</html>
