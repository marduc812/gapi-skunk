import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ResultsType, SafeAPI, VulnerableAPI } from '@/lib/types';
import { FiCopy } from 'react-icons/fi';
import Image from 'next/image';

interface AnalysisResultsProps {
  analysis: ResultsType;
  codeLanguage: string;
}

const AnalysisResults = (props: AnalysisResultsProps) => {

  
  const { analysis, codeLanguage } = props;

  return (
    <div className='w-full'>
      <div className='pt-10 flex flex-row justicy-center'>
        <Image src={'/vulnerable.svg'} alt={'vulnerable shield icon'} width={30} height={30} />
        <h4 className='text-2xl font-bold pl-2'>Vulnerable</h4>
      </div>
      <ul className='p-5 list-none'>

        {analysis.vulnerable.length === 0 && <p className='pl-2'>No vulnerable APIs found</p>}

        {analysis.vulnerable.map((vulnerableResult: VulnerableAPI) => {
          return (
            <VulnerableResultView
              key={`vulnerable-${vulnerableResult.name}`}
              name={vulnerableResult.name}
              description={vulnerableResult.description}
              poc={vulnerableResult.poc}
              codeLanguage={vulnerableResult.codeLanguage}
            />
          );
        })}
      </ul>
      <div className='pt-10 flex flex-row justicy-center'>
        <Image src={'/safe.svg'} alt={'safe shield icon'} width={30} height={30} />
        <h4 className='text-2xl font-bold pl-2'>Safe</h4>
      </div>

      <ul className='pl-5 pt-2 list-none'>
        {analysis.safe.length === 0 && <li className='pl-2'>No Safe APIs found</li>}
        {analysis.safe.map((safeResult: SafeAPI) => {
          return (
            <SafeResultView
              key={`safe-${safeResult.name}`}
              name={safeResult.name}
            />
          );
        })}
      </ul>
    </div>
  );
};

const VulnerableResultView = (props: VulnerableAPI) => {
  const onCopy = () => {
    navigator.clipboard.writeText(props.poc);
  };
  
  return (
    <li>
      <h3 className='text-xl text-red-600 font-bold'>{props.name}</h3>
      <p className='text-slate-600'>{props.description}</p>

      <div className='flex flex-row justify-between items-center'>
        <p className='text-md font-bold'>Proof of Concept:</p>
        <button type="button" onClick={onCopy} className="text-white bg-black hover:bg-slate-900 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center mr-1 mb-1">
          Copy
          <FiCopy className='ml-1' />
        </button>
      </div>

      <SyntaxHighlighter language={props.codeLanguage} style={github} showLineNumbers >
        {props.poc}
      </SyntaxHighlighter>
    </li>
  );
};

const SafeResultView = (props: SafeAPI) => {
  return (
    <div className=''>
      <h3 className='text-xl text-green-600 font-bold'>{props.name}</h3>
    </div>
  );
};

export default AnalysisResults;
