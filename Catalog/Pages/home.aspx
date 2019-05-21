<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="home.aspx.cs" Inherits="Catalog.Pages.home" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Jewellery Catalog</title>
    <link rel="shortcut icon" href="../images/static/favicon.ico" type="image/x-icon" />
    <%--<link href="../css/bootstrap.min.css" rel="stylesheet" />--%>
    <link href="../css/bootstrap4.3.min.css" rel="stylesheet" />
    <link href="../css/baguetteBox.min.css" rel="stylesheet" />
    <link href="../css/ajaxloader.css" rel="stylesheet" />
    <link href="../css/cards-gallery.css" rel="stylesheet" />
    <script src="../scripts/jquery-3.0.0.min.js"></script>
    <script src="../scripts/popper.min.js"></script>
    <script src="../scripts/bootstrap.4.3.1.min.js"></script>
    <script src="../scripts/app/home.js"></script>
    <style>
        /* Make the image fully responsive */
        .carousel-inner img {
            width: 100%;
            /*        height: 100%;*/
        }

        .captionfont {
            color: red;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
         <div id="loader"></div>
        <%--<div class="container">--%>
        <nav class="navbar navbar-inverse" style="background-color: #232f3e;">
            <a class="navbar-brand mb-0 h1" href="#" style="color: #ffd500;">Jewellery Catalog</a>
            <input type="text" id="txtsearch" placeholder="Search.." class="form-control" style="width: 50%" />
            <button type="button" id="btnsearch" class="btn btn-success" style="position: relative; float: left;">Search</button>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls=".navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>



            <ul class="nav navbar-nav navbar-right">
                <li style="align-content: center">
                    <a href="../Pages/UserLogin.aspx" style="color: #fdf8bc; font-style: italic;">Login to Admin Module</a>
                </li>
            </ul>
        </nav>

        <div id="divbanner" class="carousel slide" data-ride="carousel">
            <%--<ul class="carousel-indicators">
                <li data-target="#divbanner" data-slide-to="0" class="active"></li>                
            </ul>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="../images/static/IM.jpg" alt="Los Angeles" width="100%" height="500">
                    <div class="carousel-caption" style="color: gold">
                        <h1>Los Angeles</h1>
                        <p>We had such a great time in LA!</p>
                    </div>
                </div>                
            </div>
            <a class="carousel-control-prev" href="#divbanner" data-slide="prev">
                <span class="carousel-control-prev-icon"></span>
            </a>
            <a class="carousel-control-next" href="#divbanner" data-slide="next">
                <span class="carousel-control-next-icon"></span>
            </a>--%>
        </div>

        <div class="container">
            <section class="gallery-block cards-gallery">
                <div style="margin-bottom: 30px;margin-top: 30px">
                    <h5>Trending Jewellery</h5>
                </div>
                <div class="row" id="divtrending">
                    <%-- <div class="col-6 col-md-4 col-lg-3">
                        <div class="card border-0 transform-on-hover">
                            <a class="lightbox" href="../images/static/image1.jpg">
                                <img src="../images/static/image1.jpg" alt="Card Image" class="card-img-top">
                            </a>
                            <div class="card-body">
                                <h6><a href="#">Earrings</a></h6>
                                <p class="text-muted card-text">Gross 10 Gm, Net 8 Gm, Stone 2 GM,</br> Wasttage : 5% VA, Amount Rs.50,000.00</p>
                            </div>
                        </div>
                    </div> --%>
                </div>

            </section>
        </div>
        <div class="align-items-center p-3 my-3" style="background-color: #232f3e; color: #ffd500; text-align: center; align-content: center">
            © Copyright 2019 Jewellery Catalog. All Rights Reserved.             
       
        </div>

    </form>
    <script src="../scripts/baguetteBox.min.js"></script>
    <script>
        //baguetteBox.run('.cards-gallery', { animation: 'slideIn' });
    </script>
</body>
</html>
