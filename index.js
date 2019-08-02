function start(){

    const content = {}

    content.HR = searchForHR()


    function searchForHR(){
        acgwIPs = getACGWIPs()
        
    }

    function getACGWIPs(){
        // Verifica no EM7 os ACGWs disponiveis.
        acgw =  ['10.124.249.1','10.124.249.2','10.124.249.3','10.124.249.4']

        //dentro do ACGW, coletar informações das HRs.
        '/acgw/apps/stats '
        
    }


    console.log(content.HR)
}

start()