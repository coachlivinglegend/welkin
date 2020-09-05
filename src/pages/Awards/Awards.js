import React, {useEffect} from 'react';
import './Awards.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import award from '../../assets/award.jpg'


const Awards = () => {
    useEffect(() => {
        document.title = "Awards - Welkin International School"
}, [])

    return (
        <div>
        <Header/>
        <div style={{backgroundImage:`url(${award})`, height:650, backgroundPosition: "center", backgroundReapeat: "no-repeat",  backgroundSize: "cover"}}/>
        <div>
            <div className="awardWrapper">
          
                <div className="divWrap awardTop">
                    <div className="awardTitle">
                        <p>COMPETITION</p>
                    </div>
                    <div className="awardPosition">
                        <p>POSITION</p>
                    </div>
                </div>
                <div className="divWrap">
                    <div className="awardTitle">
                        <p>2020, American Mathematics Competition [AMC 10]</p>
                    </div>
                    <div className="awardPosition">
                        <p>1st and 2nd Position (State)</p>
                        <p>2nd and 3rd Position (National)</p>
                    </div>
                </div>
                <div className="divWrap">
                    <div className="awardTitle">
                        <p>2020, American Mathematics Competition [AMC 12]</p>
                    </div>
                    <div className="awardPosition">
                        <p>1st and 4th position (State)</p>
                        <p>1st and 7th Position (National)</p>
                    </div>
                </div>
                <div className="divWrap">
                    <div className="awardTitle">
                        <p>Mathematical Association of Nigeria [MAN] Mathematics Competition 2019/2020 State Level</p>
                    </div>
                    <div className="awardPosition">
                        <p>1st Position (Primary Quiz)</p>
                        <p>1st and 3rd Position (Junior Secondary Quiz)</p>
                        <p>1st Position (Senior Secondary Quiz)</p>
                    </div>
                </div>
                <div className="divWrap">
                    <div className="awardTitle">
                        <p>2020 South African Mathematics Olympiad [1st Round]</p>
                    </div>
                    <div className="awardPosition">
                        <p>Perfect Scores (Junior and Senior Category)</p>
                    </div>
                </div>
                <div className="divWrap">
                    <div className="awardTitle">
                        <p>Mathematical Association of Nigeria [MAN] Mathematics Competition 2018/2019 Senior Category</p>
                    </div>
                    <div className="awardPosition">
                    <p>1st position (State Level – Quiz Competition) – Gold</p>
                    </div>
                </div>
                <div className="divWrap">
                    <div className="awardTitle">
                        <p>Mathematical Association of Nigeria [MAN] Mathematics Competition  Junior Category</p>
                    </div>
                    <div className="awardPosition">
                        <p>2nd Position  (State Level – Written Exam)                 Silver </p>
                        <p>2nd Position  (State level – Quiz Competition)            Silver </p>
                        <p>3rd position   (State level – Quiz competition)            Bronze  </p>
                    </div>
                </div>
                <div className="divWrap">
                    <div className="awardTitle">
                        <p>OGF Mathematics Is Simple Competition</p>
                    </div>
                    <div className="awardPosition">
                        <p>3rd Position</p>
                    </div>
                </div>
                <div className="divWrap">
                    <div className="awardTitle">
                        <p>National Mathematics Competition [NMC] - 2019/2020 Junior Category</p>
                    </div>
                    <div className="awardPosition">
                        <p>Mathematics (1st round) – 1st, 2nd, 3rd, 4th, 5th, 6th position overall.</p>
                        <p>Mathematics (2nd Round, National level)- 2nd and 3rd position overall.</p>
                        <p>Mathematics (2nd Round National level) – Overall Best female student in Nigeria</p>
                        <p>Mathematics (3rd Round, national level) – Overall Best female student in Nigeria</p>
                    </div>
                </div>
                <div className="divWrap">
                    <div className="awardTitle">
                        <p>National Mathematics Competition [NMC] - 2019/2020 Senior Category</p>
                    </div>
                    <div className="awardPosition">
                        <p>Mathematics (1st round) – 2nd position overall.</p>
                        <p>Mathematics (2nd Round, National level) – 6th position overall.</p>
                        <p>Mathematics (3rd Round, National level) – 3rd Best female student in Nigeria.</p>
                    </div>
                </div>
                <div className="divWrap">
                    <div className="awardTitle">
                        <p>2019 TESTMASTER Master of Mathematics Competition</p>
                    </div>
                    <div className="awardPosition">
                        <p>1st Position (National)</p>
                    </div>
                </div>
                <div className="divWrap">
                    <div className="awardTitle">
                        <p>OGTV Annual Mathematics Competition.</p>
                    </div>
                    <div className="awardPosition">
                        <p>3rd Position, 4th Position, 5th Position.</p>
                    </div>
                </div>
                <div className="divWrap">
                    <div className="awardTitle">
                        <p>Cowbellpedia Mathematics TV Quiz Show : Junior Category</p>
                    </div>
                    <div className="awardPosition">
                        <p>5th best Overall in Nigeria.</p>
                    </div>
                </div>
                <div className="divWrap">
                    <div className="awardTitle">
                        <p>National Mathematics Competition [NMC] - 2018/2019 Junior Category</p>
                    </div>
                    <div className="awardPosition">
                        <p>Mathematics (1st round, State level) – 3rd position overall (Ogun state)</p>
                        <p>Mathematics (1st Round, State level) − Overall best female student (Ogun state)</p>
                        <p>Mathematics (2nd Round, National level)- 2nd position overall (Ogun state)</p>
                        <p>Mathematics (2nd Round National level ) – Overall Best female student in Nigeria</p>
                        <p>Mathematics (3rd Round, national level) – Overall Best female student in Nigeria</p>
                    </div>
                </div>
                <div className="divWrap">
                    <div className="awardTitle">
                        <p>National Mathematics Competition [NMC] – 2018/2019, Senior Category</p>
                    </div>
                    <div className="awardPosition">
                        <p>Physics (1st round, State level) – Overall Best SS1 student (Ogun state)</p>
                        <p>Physics (1st round, State level) – Overall Best Female student  (Ogun state )</p>
                        <p>Biology (2nd Round, National Level ) – 1st Position Overall  (Ogun state)</p>
                        <p>Biology (2nd Round National Level) – 8th Position Overall  (in Nigeria)</p>
                    </div>
                </div>
                <div className="divWrap">
                    <div className="awardTitle">
                        <p>American Mathematics  Competition [AMC 8] 2018</p>
                    </div>
                    <div className="awardPosition">
                        <p>1st Position (Ogun state)</p>
                        <p>1st position in Secondary School (in Nigeria)</p>
                        <p>1 Gold medal</p>
                        <p>2 Bronze medals</p>
                    </div>
                </div>
                <div className="divWrap">
                    <div className="awardTitle">
                        <p>American Mathematics  Competition [AMC 10] 2019</p>
                    </div>
                    <div className="awardPosition">
                        <p>1st Position (Ogun state)</p>
                        <p>2 Silver medals</p>
                    </div>
                </div>
                <div className="divWrap">
                    <div className="awardTitle">
                        <p>Kangaroo San Frontieres Mathematics Competition 2019</p>
                    </div>
                    <div className="awardPosition">
                        <p>2 Gold Medals</p>
                        <p>1 Silver Medal</p>
                        <p>4 Bronze Medals</p>
                    </div>
                </div>
                <div className="divWrap">
                    <div className="awardTitle">
                        <p>Our Generation Foundation Mathematics is Simple Competition 2019</p>
                    </div>
                    <div className="awardPosition">
                        <p>Overall 3rd Best Student</p>
                        <p>Overall Best student in SS1</p>
                        <p>Overall Best Teacher</p>
                        <p>Overall 3rd Best School</p>
                        <p>Overall 3rd Best Teamwork</p>
                    </div>
                </div>
                <div className="divWrap">
                    <div className="awardTitle">
                        <p>Odus Glorious Mathematics Competition</p>
                    </div>
                    <div className="awardPosition">
                        <p>3rd Position</p>
                        <p>4th Position</p>
                        <p>5th Position</p>
                    </div>
                </div>
                <div className="divWrap">
                    <div className="awardTitle">
                        <p>CHAMP Inter – School TV Quiz Show </p>
                    </div>
                    <div className="awardPosition">
                    <p>Quarter Finalists </p>
                    </div>
                </div>
                <div className="divWrap">
                    <div className="awardTitle">
                        <p>National Spelling Bee Competition 2018/2019 </p>
                    </div>
                    <div className="awardPosition">
                        <p>Qualified for Regional Level </p>
                    </div>
                </div>
                <div className="divWrap">
                    <div className="awardTitle">
                        <p>Kingdom Heritage Model School’s Inter – House sport Competition 2019</p>
                    </div>
                    <div className="awardPosition">
                        <p>1st Position in 4 x 100m Relay – Race (Male)</p>
                        <p>3rd Position in 4 x 100m Relay – race (Female)</p>
                    </div>
                </div>
                <div className="divWrap">
                    <div className="awardTitle">
                        <p>Adeoye International Schools Inter-House Sport Competition 2019</p>
                    </div>
                    <div className="awardPosition">
                        <p>2nd Position in 4 x 100m Relay – race (male)</p>
                    </div>
                </div>
                <div className="divWrap">
                    <div className="awardTitle">
                        <p>Brainfield International Schools Inter – House Sport Competition 2019</p>
                    </div>
                    <div className="awardPosition">
                        <p>1st position in 4 x 100m Relay – race (male) </p>
                    </div>
                </div>
                <div className="divWrap">
                    <div className="awardTitle">
                        COMPETITION
                    </div>
                    <div className="awardPosition">
                        POSITION
                    </div>
                </div>
                <div className="divWrap">
                    <div className="awardTitle">
                        COMPETITION
                    </div>
                    <div className="awardPosition">
                        POSITION
                    </div>
                </div>
                <div className="divWrap">
                    <div className="awardTitle">
                        COMPETITION
                    </div>
                    <div className="awardPosition">
                        POSITION
                    </div>
                </div>
                <div className="divWrap">
                    <div className="awardTitle">
                        COMPETITION
                    </div>
                    <div className="awardPosition">
                        POSITION
                    </div>
                </div>
                <div className="divWrap">
                    <div className="awardTitle">
                        COMPETITION
                    </div>
                    <div className="awardPosition">
                        POSITION
                    </div>
                </div>
                <div className="divWrap">
                    <div className="awardTitle">
                        COMPETITION
                    </div>
                    <div className="awardPosition">
                        POSITION
                    </div>
                </div>
                <div className="divWrap">
                    <div className="awardTitle">
                        COMPETITION
                    </div>
                    <div className="awardPosition">
                        POSITION
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </div>

    )
}

export default Awards